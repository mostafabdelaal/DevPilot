import type { FastifyInstance } from "fastify";
import { SAMPLE_TEAM, SAMPLE_USER } from "../lib/data.js";

export default async function meRoutes(fastify: FastifyInstance) {
  fastify.get("/v1/me", async () => SAMPLE_USER);
  fastify.get("/v1/team", async () => SAMPLE_TEAM);
}
