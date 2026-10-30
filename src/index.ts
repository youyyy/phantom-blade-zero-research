// Cloudflare Workers 后端入口
// 格式就是：export default 一个带 fetch 方法的对象，每个 HTTP 请求都会进这个函数

// 内存数据（重启会丢；要持久化就接 D1 / KV，后面再说）
const tips = [
  { id: 1, title: "闪避与完美格挡", content: "敌人红光攻击无法格挡，需闪避；白光攻击可完美格挡触发处决。" },
  { id: 2, title: "见切系统", content: "战斗中通过永劫无间的见切机制积累点数，用于解锁新武学。" },
  { id: 3, title: "探索优先级", content: "主线推进到开放区域后，优先清据点解锁快速旅行。" },
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // GET /api/tips —— 攻略列表，支持 ?q=关键词搜索
    if (url.pathname === "/api/tips" && request.method === "GET") {
      const q = url.searchParams.get("q")?.toLowerCase();
      const data = q
        ? tips.filter(t => (t.title + t.content).toLowerCase().includes(q))
        : tips;
      return Response.json({ code: 0, data });
    }

    // GET /api/tips/:id —— 单条攻略
    const match = url.pathname.match(/^\/api\/tips\/(\d+)$/);
    if (match && request.method === "GET") {
      const tip = tips.find(t => t.id === Number(match[1]));
      return tip
        ? Response.json({ code: 0, data: tip })
        : Response.json({ code: 404, msg: "not found" }, { status: 404 });
    }

    // POST /api/tips —— 新增攻略（demo：纯内存，无鉴权）
    if (url.pathname === "/api/tips" && request.method === "POST") {
      const body = await request.json<{ title: string; content: string }>();
      if (!body?.title) {
        return Response.json({ code: 400, msg: "title required" }, { status: 400 });
      }
      const tip = { id: tips.length + 1, title: body.title, content: body.content ?? "" };
      tips.push(tip);
      return Response.json({ code: 0, data: tip }, { status: 201 });
    }

    // GET /api/server-info —— 看服务端运行环境
    if (url.pathname === "/api/server-info") {
      return Response.json({
        code: 0,
        data: {
          runtime: "cloudflare-workers",
          colo: request.cf?.colo,          // 请求落在哪个边缘节点
          region: request.cf?.country,     // 来源国家
          serverTime: new Date().toISOString(),
        },
      });
    }

    // 其余路径交给静态资源（assets 配置），到这里说明 404
    return env.ASSETS.fetch(request);
  },
};
