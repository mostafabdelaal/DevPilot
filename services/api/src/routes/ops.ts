import type { FastifyInstance } from "fastify";
import {
  SAMPLE_API_KEYS,
  SAMPLE_AUDIT,
  SAMPLE_DEPLOYMENTS,
  SAMPLE_INTEGRATIONS,
  SAMPLE_NOTIFICATIONS,
} from "../lib/data-ops.js";

export default async function opsRoutes(fastify: FastifyInstance) {
  fastify.get("/v1/projects/:id/deployments", async () => SAMPLE_DEPLOYMENTS);
  fastify.get("/v1/notifications", async () => SAMPLE_NOTIFICATIONS);
  fastify.get("/v1/integrations", async () => SAMPLE_INTEGRATIONS);
  fastify.get("/v1/api-keys", async () => SAMPLE_API_KEYS);
  fastify.get("/v1/audit", async () => SAMPLE_AUDIT);
}
