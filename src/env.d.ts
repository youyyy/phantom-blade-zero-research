interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: D1Database;
}
