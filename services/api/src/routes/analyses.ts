import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import { config } from "../config.js";
import { SAMPLE_STEPS, sampleAnalysis } from "../lib/data.js";

export default async function analysisRoutes(fastify: FastifyInstance) {
  // Kick off an analysis (stub: returns an id the client can subscribe to).
  fastify.post<{ Params: { id: string } }>(
    "/v1/projects/:id/analyses",
    async (req, reply) => {
      const analysisId = `an_${randomUUID().slice(0, 8)}`;
      return reply.code(202).send({ analysisId, projectId: req.params.id });
    },
  );

  // Poll analysis status/steps.
  fastify.get<{ Params: { id: string } }>("/v1/analyses/:id", async (req) =>
    sampleAnalysis("prj_orbit", req.params.id),
  );

  // Stream step progress over Server-Sent Events.
  fastify.get<{ Params: { id: string } }>(
    "/v1/analyses/:id/events",
    async (req, reply) => {
      reply.hijack();
      reply.raw.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": config.webOrigin,
      });

      const send = (obj: unknown) =>
        reply.raw.write(`data: ${JSON.stringify(obj)}\n\n`);

      send({ type: "start", total: SAMPLE_STEPS.length });

      let i = 0;
      const timer = setInterval(() => {
        if (i >= SAMPLE_STEPS.length) {
          send({ type: "done", progressPct: 100 });
          clearInterval(timer);
          reply.raw.end();
          return;
        }
        send({
          type: "step",
          ordinal: i + 1,
          step: SAMPLE_STEPS[i],
          progressPct: Math.round(((i + 1) / SAMPLE_STEPS.length) * 100),
        });
        i += 1;
      }, 400);

      req.raw.on("close", () => clearInterval(timer));
    },
  );
}
