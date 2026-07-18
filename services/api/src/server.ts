import cors from "@fastify/cors";
import Fastify from "fastify";
import { config } from "./config.js";
import analysisRoutes from "./routes/analyses.js";
import healthRoutes from "./routes/health.js";
import meRoutes from "./routes/me.js";
import opsRoutes from "./routes/ops.js";
import projectRoutes from "./routes/projects.js";

export function buildServer() {
  const app = Fastify({
    logger: { level: config.env === "development" ? "info" : "warn" },
  });

  app.register(cors, { origin: config.webOrigin, credentials: true });

  app.register(healthRoutes);
  app.register(meRoutes);
  app.register(projectRoutes);
  app.register(analysisRoutes);
  app.register(opsRoutes);

  return app;
}

async function main() {
  const app = buildServer();
  try {
    await app.listen({ port: config.port, host: config.host });
    app.log.info(`DevPilot API listening on :${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
