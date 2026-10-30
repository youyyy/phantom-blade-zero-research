// Cloudflare Workers 后端入口
// 格式就是：export default 一个带 fetch 方法的对象，每个 HTTP 请求都会进这个函数
// 数据存 D1（Cloudflare 的 SQLite），代码里通过 env.DB 执行 SQL

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // GET /api/tips —— 攻略列表，支持 ?q=关键词搜索
    if (url.pathname === "/api/tips" && request.method === "GET") {
      const q = url.searchParams.get("q");
      const { results } = q
        ? await env.DB.prepare(
            "SELECT * FROM tips WHERE title LIKE ?1 OR content LIKE ?1 ORDER BY id"
          )
            .bind(`%${q}%`)
            .all()
        : await env.DB.prepare("SELECT * FROM tips ORDER BY id").all();
      return Response.json({ code: 0, data: results });
    }

    // GET /api/tips/:id —— 单条攻略
    const match = url.pathname.match(/^\/api\/tips\/(\d+)$/);
    if (match && request.method === "GET") {
      const tip = await env.DB.prepare("SELECT * FROM tips WHERE id = ?1")
        .bind(Number(match[1]))
        .first();
      return tip
        ? Response.json({ code: 0, data: tip })
        : Response.json({ code: 404, msg: "not found" }, { status: 404 });
    }

    // POST /api/tips —— 新增攻略（写入 D1，demo 无鉴权）
    if (url.pathname === "/api/tips" && request.method === "POST") {
      const body = await request.json<{ title: string; content: string }>();
      if (!body?.title) {
        return Response.json({ code: 400, msg: "title required" }, { status: 400 });
      }
      const result = await env.DB.prepare("INSERT INTO tips (title, content) VALUES (?1, ?2)")
        .bind(body.title, body.content ?? "")
        .run();
      const tip = await env.DB.prepare("SELECT * FROM tips WHERE id = ?1")
        .bind(result.meta.last_row_id)
        .first();
      return Response.json({ code: 0, data: tip }, { status: 201 });
    }

    // 其余路径交给静态资源（assets 配置），到这里说明 404
    return env.ASSETS.fetch(request);
  },
};
