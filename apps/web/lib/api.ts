// Typed API client. Base URL from NEXT_PUBLIC_API_URL (defaults to local API).
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * GET a typed resource from the API. `cache: "no-store"` keeps data live in
 * server components. Throws ApiError on non-2xx.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new ApiError(res.status, `GET ${path} failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

/**
 * Like apiGet but returns `fallback` if the request fails (API down, network
 * error). Lets screens render sample data offline during development.
 */
export async function apiGetOr<T>(path: string, fallback: T): Promise<T> {
  try {
    return await apiGet<T>(path);
  } catch {
    return fallback;
  }
}

export { API_BASE };
