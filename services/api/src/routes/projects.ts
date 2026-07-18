import type { FastifyInstance } from "fastify";
import { SAMPLE_PROJECTS } from "../lib/data.js";
import type { ApiError } from "../lib/types.js";

export default async function projectRoutes(fastify: FastifyInstance) {
  fastify.get("/v1/projects", async () => SAMPLE_PROJECTS);

  fastify.get<{ Params: { id: string } }>(
    "/v1/projects/:id",
    async (req, reply) => {
      const project = SAMPLE_PROJECTS.find((p) => p.id === req.params.id);
      if (!project) {
        const body: ApiError = {
          error: { code: "not_found", message: "Project not found" },
        };
        return reply.code(404).send(body);
      }
      return project;
    },
  );
}
