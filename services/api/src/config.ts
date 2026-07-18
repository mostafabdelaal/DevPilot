// Environment configuration with safe defaults for local dev.
export const config = {
  env: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 8080),
  host: process.env.HOST ?? "0.0.0.0",
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgres://devpilot:devpilot@localhost:5432/devpilot",
  webOrigin: process.env.APP_URL ?? "http://localhost:3000",
} as const;
