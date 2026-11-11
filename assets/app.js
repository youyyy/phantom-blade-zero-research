/* 《影之刃零 · 武典》交互与渲染 — 纯前端，无后端 / 无构建 / 无依赖 */
(function () {
  "use strict";
  const D = window.PBZ;
  if (!D) return;

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 进度存储 ---------------- */
  const KEY = "pbz-codex-progress-v1";
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  const isOn = (k) => !!state[k];
  const setOn = (k, v) => { if (v) state[k] = 1; else delete state[k]; save(); refreshProgress(); return !!v; };
  const toggle = (k) => setOn(k, !isOn(k));

  const COLLECT = D.regions.reduce((a, r) => a + r.collect.length, 0);
  const WEAPONS = D.weapons.main.length + D.weapons.edges.length;
  const TROPHIES = D.trophies.length;
  const REGIONS = D.regions.length;
  const BOSSES = D.bosses.length;
  const CODEX = (D.codex || []).length;
  const TOTAL = COLLECT + WEAPONS + TROPHIES + REGIONS + BOSSES + CODEX;
  const collectKeys = () => D.regions.flatMap((r) => r.collect.map((c) => c.id));
  const weaponKeys = () => D.weapons.main.map((_, i) => "wm:" + i).concat(D.weapons.edges.map((_, i) => "we:" + i));
  const trophyKeys = () => D.trophies.map((_, i) => "t:" + i);
  const regionKeys = () => D.regions.map((r) => "region:" + r.id);
  const bossKeys = () => D.bosses.map((b) => "boss:" + b.id);
  const codexKeys = () => (D.codex || []).map((c) => "codex:" + c.no);
  const counted = (keys) => keys.filter(isOn).length;

  function moduleStats() {
    return [
      { n: "八境流程", v: counted(regionKeys()), m: REGIONS },
      { n: "全收集", v: counted(collectKeys()), m: COLLECT },
      { n: "兵谱", v: counted(weaponKeys()), m: WEAPONS },
      { n: "奖杯", v: counted(trophyKeys()), m: TROPHIES },
      { n: "群雄讨伐", v: counted(bossKeys()), m: BOSSES },
      { n: "首领录", v: counted(codexKeys()), m: CODEX },
    ];
  }
  function totalPct() {
    const s = moduleStats();
    const v = s.reduce((a, x) => a + x.v, 0);
    return { v, pct: TOTAL ? Math.round((v / TOTAL) * 100) : 0, s };
  }
  function refreshProgress() {
    const r = totalPct();
    $("#progressPct").textContent = r.pct + "%";
    $("#ringFg").style.strokeDashoffset = String(100.5 * (1 - r.pct / 100));
    $("#drawerStats").innerHTML = r.s.map((x) =>
      `<div class="dstat"><div class="dstat-top"><span>${esc(x.n)}</span><b>${x.v} / ${x.m}</b></div>
       <div class="meter-bar"><i style="width:${x.m ? (x.v / x.m) * 100 : 0}%"></i></div></div>`
    ).join("");
    const cv = r.s[1].v, cm = r.s[1].m;
    $("#collectPct").textContent = Math.round((cv / cm) * 100) + "%";
    $("#collectBar").style.width = (cv / cm) * 100 + "%";
    const tv = r.s[3].v;
    $("#trophyPct").textContent = tv + " / " + TROPHIES;
    $("#trophyBar").style.width = (tv / TROPHIES) * 100 + "%";
  }

  /* ---------------- 开卷 / 卷首 ---------------- */
  // 窄屏时把 SVG 取景框右移，保证红月与剑客剪影仍在画面内
  function setHeroViewBox() {
    const art = $(".hero-art");
    if (art) art.setAttribute("viewBox", window.innerWidth < 760 ? "600 0 620 900" : "0 0 1440 900");
  }
  function initOpening() {
    const o = $("#opening");
    let done = false;
    const close = () => { if (done) return; done = true; o.classList.add("done"); setTimeout(() => o.remove(), 800); };
    window.addEventListener("load", () => setTimeout(close, 420));
    setTimeout(close, 1500);

    // 逐字标题
    const t = $("#heroTitle");
    t.innerHTML = Array.from(D.meta.title).map((c, i) => `<span style="animation-delay:${0.5 + i * 0.15}s">${esc(c)}</span>`).join("");

    // 打字机卷首语
    const q = $("#heroQuote"), text = D.meta.intro;
    if (reduce) { q.textContent = text; } else {
      let i = 0;
      const tick = () => { q.textContent = text.slice(0, ++i) + (i < text.length ? "▌" : ""); if (i < text.length) setTimeout(tick, 42); };
      setTimeout(tick, 1900);
    }

    // 数字与统计
    $("#heroStats").innerHTML = D.stats.map((s, i) =>
      `<div class="hero-stat"><b data-n="${s.n}">0</b><i>${esc(s.label)}</i></div>`
    ).join("");
    setTimeout(() => {
      $$("#heroStats b").forEach((el, i) => {
        const n = +el.dataset.n, st = performance.now(), dur = 900 + i * 90;
        const step = (now) => {
          const p = Math.min(1, (now - st) / dur);
          el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, 1750);

    // 落花 / 墨点
    const box = $("#heroPetals");
    let html = "";
    for (let i = 0; i < 30; i++) {
      const left = Math.random() * 100, size = 4 + Math.random() * 8;
      const dur = 9 + Math.random() * 12, delay = -Math.random() * 18;
      html += `<i class="petal${Math.random() > .72 ? " ink" : ""}" style="left:${left.toFixed(1)}%;width:${size.toFixed(1)}px;height:${(size * 1.3).toFixed(1)}px;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s"></i>`;
    }
    box.innerHTML = html;
  }

  /* ---------------- 卷目 ---------------- */
  const MULU = [
    { no: "壹", t: "心法 · 底层武理", d: "杀气、三色信号光、难度四境", m: "4 诀 / 3 光 / 4 境", h: "#xinf" },
    { no: "贰", t: "八境 · 主线流程", d: "按铃铛推进的八章路线与必做事项", m: "8 境 · 可勾选", h: "#liucheng" },
    { no: "叁", t: "群雄 · Boss 打法", d: "75 条游戏内战绩 + 61 场遭遇 · 18 场逐阶段拆解", m: CODEX + " 条 / " + BOSSES + " 场", h: "#qunxiong" },
    { no: "肆", t: "兵谱 · 全武器", d: "25 主武器、25 影之武装与四套流派", m: WEAPONS + " 件 · 4 流派", h: "#bingpu" },
    { no: "伍", t: "藏锋 · 全收集", d: "记忆之花、黑石、琥珀、面具、龙柱", m: COLLECT + " 项可勾选", h: "#shouji" },
    { no: "陆", t: "异闻 · 任务链", d: "11 条成就 / 真结局相关支线与截止点", m: D.quests.length + " 条长链", h: "#zhixian" },
    { no: "柒", t: "归途 · 多结局", d: "三结局条件、分支自检器与终局路线", m: "3 结局", h: "#jiejv" },
    { no: "捌", t: "功名 · 全成就", d: "36 奖杯筛选、勾选与白金进度", m: TROPHIES + " 杯", h: "#chengjiu" },
    { no: "玖", t: "避坑 · 不可逆", d: "十九条血泪警示 + 八条开荒诀要", m: D.warnings.length + " 警示", h: "#bikeng" },
    { no: "拾", t: "术语 · 中英口径", d: "装备栏位、资源、动作、难度官方用词与待核译名", m: D.glossary.reduce((a, g) => a + g.rows.length, 0) + " 条对照", h: "#shuyu" },
  ];
  function renderMulu() {
    $("#muluGrid").innerHTML = MULU.map((m) =>
      `<a class="mulu-card reveal" href="${m.h}" style="--d:${MULU.indexOf(m) * 45}ms">
        <span class="mulu-arrow">↗</span><div class="mulu-no">${m.no}</div>
        <h3>${esc(m.t)}</h3><p>${esc(m.d)}</p><div class="mulu-meta">${esc(m.m)}</div></a>`
    ).join("");
  }

  /* ---------------- 壹 心法 ---------------- */
  function renderMechanics() {
    $("#mechGrid").innerHTML = D.mechanics.map((m, i) =>
      `<article class="mech-card reveal" data-no="${esc(m.no)}" style="--d:${i * 70}ms">
        <div class="mech-top"><b>${esc(m.no)}</b><i>${esc(m.en)}</i></div>
        <h3>${esc(m.title)}</h3><p>${esc(m.body)}</p>
        <div class="mech-tip">${esc(m.tip)}</div></article>`
    ).join("");
    $("#signalRow").innerHTML = D.signals.map((s, i) =>
      `<div class="signal-card ${s.cls} reveal" style="--d:${i * 80}ms">
        <div class="sg-char">${esc(s.color)}</div><h4>${esc(s.name)}</h4>
        <p>${esc(s.act)}</p><b>${esc(s.gain)}</b></div>`
    ).join("");
    $("#diffTabs").innerHTML = D.difficulties.map((d, i) =>
      `<button class="chip${i === 1 ? " on" : ""}" data-diff="${i}">${esc(d.name)}</button>`
    ).join("");
    const showDiff = (i) => {
      const d = D.difficulties[i];
      $("#diffPanel").innerHTML = `<div class="dp-top"><h3>${esc(d.name)}</h3><span class="dp-en">${esc(d.en)}</span><span class="dp-tag">${esc(d.tag)}</span></div>
        <p>${esc(d.desc)}</p><div class="dp-rec">${esc(d.rec)}</div>`;
      $$("#diffTabs .chip").forEach((b) => b.classList.toggle("on", +b.dataset.diff === i));
      rippleAt(null);
    };
    $("#diffTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-diff]"); if (b) showDiff(+b.dataset.diff); });
    showDiff(1);
  }

  /* ---------------- 折叠面板通用 ---------------- */
  const openSets = { route: new Set(), boss: new Set(), codex: new Set(), quest: new Set(), warn: new Set() };
  function bindAccordion(rootSel, itemSel, headSel, bodySel, group, idAttr, ignore) {
    const root = $(rootSel);
    if (!root) return;
    root.addEventListener("click", (e) => {
      if (ignore && e.target.closest(ignore)) return;
      const head = e.target.closest(headSel);
      if (!head || !root.contains(head)) return;
      const item = head.closest(itemSel);
      if (!item) return;
      const id = item.dataset[idAttr];
      const body = $(bodySel, item);
      const willOpen = !item.classList.contains("open");
      item.classList.toggle("open", willOpen);
      body.style.maxHeight = willOpen ? body.scrollHeight + "px" : "0px";
      if (willOpen) openSets[group].add(id); else openSets[group].delete(id);
    });
  }
  function restoreOpen(rootSel, itemSel, bodySel, group, idAttr) {
    $$(itemSel, $(rootSel)).forEach((item) => {
      if (!openSets[group].has(item.dataset[idAttr])) return;
      item.classList.add("open");
      const body = $(bodySel, item);
      body.style.maxHeight = body.scrollHeight + "px";
    });
  }
  function syncOpenHeights() {
    $$(".route-item.open .route-body,.boss-card.open .boss-body,.codex-card.open .codex-body,.quest-card.open .quest-body,.warn-item.open .warn-body")
      .forEach((b) => { b.style.maxHeight = b.scrollHeight + "px"; });
  }

  /* ---------------- 贰 八境 ---------------- */
  function renderRoutes() {
    $("#routeLine").innerHTML = D.regions.map((r, i) => {
      const k = "region:" + r.id, on = isOn(k);
      return `<div class="route-item reveal" data-rid="${r.id}" style="--d:${i * 45}ms">
        <span class="route-node"></span>
        <div class="route-card">
          <button class="route-head" type="button">
            <span class="route-no">${esc(r.no)}</span>
            <span class="route-names"><h3>${esc(r.name)}<small>${esc(r.en)}</small></h3><p>${esc(r.main)}　·　${esc(r.bosses)}</p></span>
            <span class="route-hours">${esc(r.hours)}</span><span class="route-chev">⌄</span>
          </button>
          <div class="route-body"><div class="route-inner">
            <div><h4>本章必做</h4><ul class="route-must">${r.must.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
              <div class="route-main"><b>主线目标</b>　${esc(r.main)}</div></div>
            <div><h4>推荐配装</h4><div class="route-gear">${esc(r.gear)}</div>
              <div class="route-tip">${esc(r.tip)}</div>
              <label class="route-done" data-key="${k}"><input type="checkbox" ${on ? "checked" : ""}><span class="box"></span>本章已清（计入行囊）</label>
            </div>
          </div></div>
        </div></div>`;
    }).join("");
  }
  function initRoutes() {
    bindAccordion("#routeLine", ".route-item", ".route-head", ".route-body", "route", "rid", ".route-done");
    $("#routeLine").addEventListener("change", (e) => {
      const lab = e.target.closest(".route-done");
      if (lab) { setOn(lab.dataset.key, e.target.checked); lab.querySelector(".box").classList.toggle("on", e.target.checked); }
    });
  }

  /* ---------------- 叁 群雄谱 ---------------- */
  let bossRegion = "全部", bossCat = "全部", bossQuery = "";
  const BOSS_CATS = ["全部", "主线", "可选", "隐藏", "复战"];
  function bossRegionList() {
    const seen = [], set = new Set();
    D.bosses.forEach((b) => { if (!set.has(b.region)) { set.add(b.region); seen.push(b.region); } });
    return ["全部"].concat(seen);
  }
  function updateBossCount(list) {
    const el = $("#bossCount");
    if (el) el.innerHTML = `显示 <b>${list.length}</b> / ${BOSSES} 场　·　已讨伐 <b>${counted(bossKeys())}</b>`;
  }
  function renderBosses() {
    $("#bossRegionChips").innerHTML = bossRegionList().map((r) =>
      `<button class="chip${bossRegion === r ? " on" : ""}" data-br="${esc(r)}">${esc(r)}</button>`
    ).join("");
    $("#bossCatChips").innerHTML = BOSS_CATS.map((c) =>
      `<button class="chip${bossCat === c ? " on" : ""}" data-bc="${esc(c)}">${esc(c)}${c === "全部" ? "" : " <i>" + D.bosses.filter((b) => b.cat === c).length + "</i>"}</button>`
    ).join("");
    const q = bossQuery.trim().toLowerCase();
    const list = D.bosses.filter((b) => {
      const hay = String(b.no) + b.name + b.en + b.region + b.place + b.kind + b.cat + b.drop + b.intro +
        (b.detail === "full" ? "详解" : "简目") + b.phases.map((p) => p.main + p.edge + p.charm + p.moves.join("")).join("");
      return (bossRegion === "全部" || b.region === bossRegion) &&
        (bossCat === "全部" || b.cat === bossCat) &&
        (!q || hay.toLowerCase().indexOf(q) >= 0);
    });
    updateBossCount(list);
    $("#bossList").innerHTML = list.length ? list.map((b, i) => {
      const k = "boss:" + b.id, on = isOn(k);
      const kindCls = b.cat === "可选" || b.cat === "隐藏" ? "side" : (b.cat === "复战" || b.no >= 58 ? "warn" : "");
      const tier = b.detail === "full" ? "详解" : "简目";
      return `<article class="boss-card reveal${on ? " done" : ""}" data-bid="${b.id}" data-bno="${b.no}" style="--d:${Math.min(i, 8) * 35}ms">
        <button class="boss-head" type="button">
          <span class="boss-ck${on ? " on" : ""}" data-bk="${esc(k)}" role="checkbox" tabindex="0" aria-checked="${on}" title="标记已讨伐"></span>
          <span class="boss-idx">${String(b.no).padStart(2, "0")}</span>
          <span class="boss-name">${esc(b.name)}</span>
          <span class="boss-place">${esc(b.region)} · ${esc(b.place)}</span>
          <span class="boss-badge ${kindCls}">${esc(b.kind)}</span>
          <span class="boss-tier ${b.detail}">${tier}</span>
          <span class="boss-drop">◈ ${esc(b.drop)}</span>
          <span class="boss-chev">⌄</span>
        </button>
        <div class="boss-body"><div class="boss-inner">
          <div class="boss-meta">EN · ${esc(b.en)}　|　${esc(b.region)} / ${esc(b.place)}　|　第 ${b.no} 场 · ${tier}</div>
          <p class="boss-intro">${esc(b.intro)}</p>
          ${b.detail === "brief" ? '<p class="boss-note">简目：本条为该区域通用配装 + 已确认机制要点，不作逐招帧数拆解；搜「详解」可只看 18 场逐阶段拆解。</p>' : ""}
          <div class="phase-grid">${b.phases.map((p) => `
            <div class="phase">
              <div class="phase-name">${esc(p.name)}</div>
              <div class="gear-row main"><em>主武器</em><span>${esc(p.main)}</span></div>
              <div class="gear-row edge"><em>影之武装</em><span>${esc(p.edge)}</span></div>
              <div class="gear-row"><em>饰品</em><span>${esc(p.charm)}</span></div>
              <div class="gear-row"><em>药瓶</em><span>${esc(p.flask)}</span></div>
              <h5>阶段应对</h5><ul>${p.moves.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
              <div class="phase-tip">${esc(p.tip)}</div>
            </div>`).join("")}</div>
        </div></div></article>`;
    }).join("") : `<div class="empty">没有匹配的首领，换个词试试。</div>`;
    restoreOpen("#bossList", ".boss-card", ".boss-body", "boss", "bid");
  }
  function initBossFilters() {
    $("#bossRegionChips").addEventListener("click", (e) => {
      const b = e.target.closest("[data-br]"); if (!b) return;
      bossRegion = b.dataset.br; renderBosses(); watch();
    });
    $("#bossCatChips").addEventListener("click", (e) => {
      const b = e.target.closest("[data-bc]"); if (!b) return;
      bossCat = b.dataset.bc; renderBosses(); watch();
    });
    $("#bossSearch").addEventListener("input", (e) => { bossQuery = e.target.value; renderBosses(); watch(); });
    // 勾选「已讨伐」不触发折叠；捕获阶段拦截，避免冒泡到手风琴
    $("#bossList").addEventListener("click", (e) => {
      const ck = e.target.closest(".boss-ck"); if (!ck) return;
      e.preventDefault(); e.stopPropagation();
      const on = toggle(ck.dataset.bk);
      ck.classList.toggle("on", on); ck.setAttribute("aria-checked", String(on));
      const card = ck.closest(".boss-card"); if (card) card.classList.toggle("done", on);
      updateBossCount($$("#bossList .boss-card"));
    }, true);
    $("#bossList").addEventListener("keydown", (e) => {
      const ck = e.target.closest(".boss-ck");
      if (ck && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); ck.click(); }
    });
    bindAccordion("#bossList", ".boss-card", ".boss-head", ".boss-body", "boss", "bid", ".boss-ck");
  }

  /* ---------------- 叁·附 首领录：游戏内 75 条 BOSS 战绩 ---------------- */
  const CODEX_CATS = ["全部", "主线", "可选", "隐藏", "形态", "剧情战"];
  let bossView = "codex", codexChapter = "全部", codexCat = "全部", codexQuery = "";
  const pad2 = (n) => String(n).padStart(2, "0");
  const codexChapterList = () => ["全部"].concat([...new Set((D.codex || []).map((c) => c.ch))]);

  function updateCodexCount(list) {
    const el = $("#codexCount");
    if (el) el.innerHTML = `显示 <b>${list.length}</b> / ${CODEX} 条　·　已收录 <b>${counted(codexKeys())}</b>`;
  }
  function renderCodex() {
    if (!CODEX || !$("#codexList")) return;
    $("#codexChapterChips").innerHTML = codexChapterList().map((c) =>
      `<button class="chip${codexChapter === c ? " on" : ""}" data-cc="${esc(c)}">${esc(c)}</button>`
    ).join("");
    $("#codexCatChips").innerHTML = CODEX_CATS.map((c) =>
      `<button class="chip${codexCat === c ? " on" : ""}" data-cx="${esc(c)}">${esc(c)}${c === "全部" ? "" : " <i>" + D.codex.filter((x) => x.cat === c).length + "</i>"}</button>`
    ).join("");
    const q = codexQuery.trim().toLowerCase();
    const list = D.codex.filter((c) => {
      const hay = c.no + c.name + c.en + c.ch + c.cat + c.drop + c.note + c.lv + c.link.join("");
      return (codexChapter === "全部" || c.ch === codexChapter) &&
        (codexCat === "全部" || c.cat === codexCat) &&
        (!q || hay.toLowerCase().indexOf(q) >= 0);
    });
    updateCodexCount(list);
    $("#codexList").innerHTML = list.length ? list.map((c, i) => {
      const k = "codex:" + c.no, on = isOn(k);
      const cls = c.cat === "隐藏" || c.cat === "形态" ? "side" : (c.cat === "剧情战" ? "" : "warn");
      return `<article class="codex-card reveal${on ? " done" : ""}" data-cid="${c.no}" style="--d:${Math.min(i, 8) * 35}ms">
        <button class="codex-head" type="button">
          <span class="boss-ck codex-ck${on ? " on" : ""}" data-ck="${esc(k)}" role="checkbox" tabindex="0" aria-checked="${on}" title="标记已收录"></span>
          <span class="codex-idx">${pad2(c.no)}</span>
          <span class="codex-name">${esc(c.name)}<small>${esc(c.en)}</small></span>
          <span class="codex-ch">${esc(c.ch)}</span>
          <span class="codex-badge ${cls}">${esc(c.cat)}</span>
          <span class="codex-drop">◈ ${esc(c.drop || "—")}</span>
          <span class="boss-chev">⌄</span>
        </button>
        <div class="codex-body"><div class="codex-inner">
          <div class="codex-facts">
            <div><em>等级</em><span>${esc(c.lv || "—")}</span></div>
            <div><em>破局者 HP</em><span>${esc(c.hp || "—")}</span></div>
            <div><em>残尘</em><span>${esc(c.dust || "—")}</span></div>
            <div><em>掉落</em><span>${esc(c.drop || "—")}</span></div>
          </div>
          ${c.note ? `<p class="codex-note">${esc(c.note)}</p>` : ""}
          <div class="codex-links"><span>对应遭遇</span>${c.link.map((n) =>
            `<button class="jump-btn" type="button" data-jump="${n}">第 ${pad2(n)} 场 · 查看配装 ↗</button>`
          ).join("")}</div>
        </div></div>
      </article>`;
    }).join("") : `<div class="empty">没有匹配的首领，换个词试试。</div>`;
    restoreOpen("#codexList", ".codex-card", ".codex-body", "codex", "cid");
  }
  function jumpToEncounter(no) {
    setBossView("encounter");
    bossRegion = "全部"; bossCat = "全部"; bossQuery = "";
    const s = $("#bossSearch"); if (s) s.value = "";
    renderBosses(); watch();
    const card = $('#bossList .boss-card[data-bno="' + no + '"]');
    if (!card) return;
    if (!card.classList.contains("open")) card.querySelector(".boss-head").click();
    setTimeout(() => card.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }), 90);
  }
  function setBossView(v) {
    bossView = v;
    $$("#bossViewSwitch .vs-btn").forEach((b) => b.classList.toggle("on", b.dataset.bv === v));
    const ev = $("#bossEncounterView"), cv = $("#bossCodexView");
    if (ev) ev.hidden = v !== "encounter";
    if (cv) cv.hidden = v !== "codex";
    if (v === "codex") renderCodex();
    else { renderBosses(); syncOpenHeights(); }
    watch();
  }
  function initCodexFilters() {
    $("#bossViewSwitch").addEventListener("click", (e) => {
      const b = e.target.closest("[data-bv]"); if (b) setBossView(b.dataset.bv);
    });
    $("#codexChapterChips").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cc]"); if (!b) return;
      codexChapter = b.dataset.cc; renderCodex(); watch();
    });
    $("#codexCatChips").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cx]"); if (!b) return;
      codexCat = b.dataset.cx; renderCodex(); watch();
    });
    $("#codexSearch").addEventListener("input", (e) => { codexQuery = e.target.value; renderCodex(); watch(); });
    $("#codexList").addEventListener("click", (e) => {
      const j = e.target.closest("[data-jump]");
      if (j) { e.stopPropagation(); jumpToEncounter(+j.dataset.jump); return; }
      const ck = e.target.closest(".codex-ck"); if (!ck) return;
      e.preventDefault(); e.stopPropagation();
      const on = toggle(ck.dataset.ck);
      ck.classList.toggle("on", on); ck.setAttribute("aria-checked", String(on));
      const card = ck.closest(".codex-card"); if (card) card.classList.toggle("done", on);
      updateCodexCount($$("#codexList .codex-card"));
    }, true);
    $("#codexList").addEventListener("keydown", (e) => {
      const ck = e.target.closest(".codex-ck");
      if (ck && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); ck.click(); }
    });
    bindAccordion("#codexList", ".codex-card", ".codex-head", ".codex-body", "codex", "cid", ".codex-ck,[data-jump]");
  }

  /* ---------------- 肆 兵谱 ---------------- */
  let weaponTab = "全部", weaponQuery = "";
  const W_TABS = ["全部", "单手", "双手", "双持", "影之武装"];
  function renderWeapons() {
    $("#weaponTabs").innerHTML = W_TABS.map((t) =>
      `<button class="chip${weaponTab === t ? " on" : ""}" data-wt="${esc(t)}">${esc(t)}</button>`
    ).join("");
    const q = weaponQuery.trim().toLowerCase();
    const rows = [];
    D.weapons.main.forEach((w, i) => rows.push({ w, k: "wm:" + i, grp: w.t }));
    D.weapons.edges.forEach((w, i) => rows.push({ w, k: "we:" + i, grp: "影之武装" }));
    const list = rows.filter(({ w, grp }) =>
      (weaponTab === "全部" || weaponTab === grp) &&
      (!q || (w.n + w.t + w.a + (w.f || "") + w.note).toLowerCase().indexOf(q) >= 0)
    );
    $("#weaponTable").innerHTML = `<div class="whead"><span></span><span>名　称</span><span>类型</span><span>区域</span><span>获取方式</span><span class="wz">机制 / 备注</span></div>` +
      (list.length ? list.map(({ w, k }) => {
        const on = isOn(k);
        return `<div class="wrow${on ? " wmark done" : " wmark"}" data-key="${k}">
          <span class="ck-box${on ? " on" : ""}" role="checkbox" aria-checked="${on}"></span>
          <span class="wn">${esc(w.n)}</span><span class="wt">${esc(w.t)}</span><span class="wa">${esc(w.a)}</span>
          <span class="wf">${esc(w.f || "—")}</span><span class="wz">${esc(w.note)}</span></div>`;
      }).join("") : `<div class="empty">没有匹配的兵刃。</div>`);
    $("#weaponTable").querySelectorAll(".wrow").forEach((row) => {
      row.addEventListener("click", () => {
        const on = toggle(row.dataset.key);
        row.classList.toggle("done", on);
        $(".ck-box", row).classList.toggle("on", on);
        $(".ck-box", row).setAttribute("aria-checked", String(on));
      });
    });
  }
  function renderBuilds() {
    $("#buildGrid").innerHTML = D.weaponBuilds.map((b, i) =>
      `<div class="build-card reveal" style="--d:${i * 60}ms"><div class="bc-stage">${esc(b.stage)}</div><h3>${esc(b.name)}</h3>
       <p><b>主武器</b>${esc(b.main)}</p><p><b>影之武装</b>${esc(b.edge)}</p>
       <p><b>饰品</b>${esc(b.charm)}</p><p><b>药瓶</b>${esc(b.flask)}</p>
       <div class="bc-note">${esc(b.note)}</div></div>`
    ).join("");
  }
  function initWeaponFilters() {
    $("#weaponTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-wt]"); if (b) { weaponTab = b.dataset.wt; renderWeapons(); } });
    $("#weaponSearch").addEventListener("input", (e) => { weaponQuery = e.target.value; renderWeapons(); });
  }

  /* ---------------- 伍 全收集 ---------------- */
  let collectTab = 0;
  function renderCollect() {
    $("#collectTabs").innerHTML = D.regions.map((r, i) =>
      `<button class="chip${collectTab === i ? " on" : ""}" data-ct="${i}">${esc(r.no)} ${esc(r.name)}</button>`
    ).join("");
    const r = D.regions[collectTab];
    const local = r.collect.filter((c) => isOn(c.id)).length;
    $("#collectPanel").innerHTML = `<h3>${esc(r.name)} · 收集自查 <span style="font-family:var(--sans);font-size:.7rem;color:var(--gold);letter-spacing:.1em">${local}/${r.collect.length}</span></h3>
      <span class="cp-en">${esc(r.en)}　/　${esc(r.hours)}　/　主线：${esc(r.main)}</span>` +
      r.collect.map((c) => {
        const on = isOn(c.id);
        return `<div class="ck-item${on ? " done" : ""}" data-key="${c.id}">
          <span class="ck-box${on ? " on" : ""}"></span>
          <span class="cktxt"><b>${esc(c.label)}</b><i>${esc(c.hint)}</i></span></div>`;
      }).join("");
    $$("#collectPanel .ck-item").forEach((it) => it.addEventListener("click", () => {
      const on = toggle(it.dataset.key);
      it.classList.toggle("done", on);
      $(".ck-box", it).classList.toggle("on", on);
      const r = D.regions[collectTab];
      const counter = $("#collectPanel h3 span");
      if (counter) counter.textContent = r.collect.filter((c) => isOn(c.id)).length + "/" + r.collect.length;
    }));
  }
  function initCollect() {
    $("#collectTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-ct]"); if (b) { collectTab = +b.dataset.ct; renderCollect(); } });
  }

  /* ---------------- 陆 异闻 ---------------- */
  function renderQuests() {
    $("#questList").innerHTML = D.quests.map((q, i) =>
      `<article class="quest-card reveal" data-qid="${q.id}" style="--d:${Math.min(i, 8) * 40}ms">
        <button class="quest-head" type="button"><span class="quest-no">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(q.name)}</h3><span class="qtag">${esc(q.tag)}</span><span class="qdead">截止 · ${esc(q.deadline)}</span><span class="quest-chev">⌄</span></button>
        <div class="quest-body"><div class="quest-inner">
          <ol class="qsteps">${q.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
          <div class="qmeta"><div class="qr"><b>奖励 / 关联</b>${esc(q.reward)}</div><div class="qw"><b>避坑</b>${esc(q.warn)}</div></div>
        </div></div></article>`
    ).join("");
    bindAccordion("#questList", ".quest-card", ".quest-head", ".quest-body", "quest", "qid");
  }

  /* ---------------- 柒 结局 ---------------- */
  function currentEnding() {
    const lake = $("#swLake").checked, pillar = $("#swPillar").checked;
    return !lake ? D.endings[2] : (pillar ? D.endings[0] : D.endings[1]);
  }
  function renderEndingCards() {
    $("#endingCards").innerHTML = D.endings.map((e) =>
      `<article class="end-card ${e.cls} reveal" data-eid="${e.id}" style="--d:${D.endings.indexOf(e) * 80}ms">
        <div class="ec-tag">${esc(e.tag)}</div><h3>${esc(e.name)}</h3><div class="ec-en">${esc(e.en)}</div>
        <p class="ec-cond">${esc(e.cond)}</p>
        <ul>${e.flow.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="ec-foot"><b>奖励</b>　${esc(e.reward)}<br><b>成就</b>　${esc(e.trophy)}</div>
        <div class="ec-tip">${esc(e.tip)}</div></article>`
    ).join("");
    $$("#endingCards .end-card").forEach((card) => card.addEventListener("click", () => {
      const id = card.dataset.eid;
      if (id === "e1") { $("#swLake").checked = true; $("#swPillar").checked = true; }
      else if (id === "e2") { $("#swLake").checked = true; $("#swPillar").checked = false; }
      else { $("#swLake").checked = false; }
      updateEnding();
    }));
  }
  function updateEnding() {
    const e = currentEnding(), lake = $("#swLake").checked, pillar = $("#swPillar").checked;
    const res = $("#checkResult");
    res.className = "check-result " + e.cls;
    res.innerHTML = `<div class="cr-tag">你的终局 · ${esc(e.tag)}</div><div class="cr-name">${esc(e.name)}</div>
      <div class="cr-en">${esc(e.en)}</div><div class="cr-desc">${esc(e.cond)}</div>`;
    const nodes = [
      { t: "冷荼战前", s: "结局在此锁定", on: true },
      { t: "湖心秘密", s: lake ? "已完成 · 与虚空对话" : "未完成", on: lake },
      { t: "血脉觉醒", s: pillar ? "5 / 5 龙柱" : "未全清", on: pillar && lake },
      { t: e.name, s: e.trophy, on: true, final: true },
    ];
    $("#endingFlow").innerHTML = nodes.map((n) =>
      `<div class="flow-node${n.on ? " on" : ""}${n.final ? " final" : ""}"><b>${esc(n.t)}</b><i>${esc(n.s)}</i></div>`
    ).join("");
    $$("#endingCards .end-card").forEach((c) => c.classList.toggle("active", c.dataset.eid === e.id));
  }
  function initEndings() {
    ["swLake", "swPillar"].forEach((id) => $("#" + id).addEventListener("change", updateEnding));
    renderEndingCards(); updateEnding();
  }

  /* ---------------- 捌 奖杯 ---------------- */
  let trophyTab = "全部", trophyQuery = "";
  const T_TABS = ["全部", "白金", "金", "银", "铜"];
  const G_CLS = { "白金": "g-platinum", "金": "g-gold", "银": "g-silver", "铜": "g-bronze" };
  function renderTrophies() {
    $("#trophyTabs").innerHTML = T_TABS.map((t) =>
      `<button class="chip${trophyTab === t ? " on" : ""}" data-tt="${esc(t)}">${esc(t)}</button>`
    ).join("");
    const q = trophyQuery.trim().toLowerCase();
    $("#trophyGrid").innerHTML = D.trophies.map((t, i) => ({ t, i })).filter(({ t }) =>
      (trophyTab === "全部" || trophyTab === t.g) && (!q || (t.n + t.d).toLowerCase().indexOf(q) >= 0)
    ).map(({ t, i }) => {
      const k = "t:" + i, on = isOn(k);
      return `<div class="trophy ${G_CLS[t.g]}${on ? " done" : ""}" data-key="${k}">
        <span class="tg">${esc(t.g)}</span>
        <span class="tt"><b>${esc(t.n)}${t.hide ? '<em class="hidden-tag">隐藏</em>' : ""}</b><i>${esc(t.d)}</i></span>
        <span class="ck-box${on ? " on" : ""}"></span></div>`;
    }).join("") || `<div class="empty" style="grid-column:1/-1">没有匹配的奖杯。</div>`;
    $$("#trophyGrid .trophy").forEach((el) => el.addEventListener("click", () => {
      const on = toggle(el.dataset.key);
      el.classList.toggle("done", on); $(".ck-box", el).classList.toggle("on", on);
    }));
  }
  function initTrophies() {
    $("#trophyTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-tt]"); if (b) { trophyTab = b.dataset.tt; renderTrophies(); } });
    $("#trophySearch").addEventListener("input", (e) => { trophyQuery = e.target.value; renderTrophies(); });
  }

  /* ---------------- 玖 避坑 ---------------- */
  function renderWarnings() {
    $("#warnList").innerHTML = D.warnings.map((w, i) =>
      `<div class="warn-item ${w.lv === "危" ? "danger" : "notice"}" data-wid="${i}">
        <button class="warn-head" type="button"><span class="warn-lv">${esc(w.lv)}</span>
          <span class="warn-no">${String(i + 1).padStart(2, "0")}</span><b>${esc(w.t)}</b>
          <span class="warn-where">${esc(w.w)}</span><span class="warn-chev">⌄</span></button>
        <div class="warn-body"><p>${esc(w.d)}</p></div></div>`
    ).join("");
    bindAccordion("#warnList", ".warn-item", ".warn-head", ".warn-body", "warn", "wid");
    $("#tipsGrid").innerHTML = D.tips.map((t, i) =>
      `<div class="tip-card reveal" style="--d:${i * 45}ms"><span>${String(i + 1).padStart(2, "0")}</span><p>${esc(t)}</p></div>`
    ).join("");
  }

  /* ---------------- 拾 术语与口径 ---------------- */
  function renderGlossary() {
    $("#glossary").innerHTML = D.glossary.map((g, gi) => `
      <div class="gl-group reveal" style="--d:${gi * 55}ms">
        <div class="gl-title"><span>${String(gi + 1).padStart(2, "0")}</span>${esc(g.g)}</div>
        <div class="gl-rows">${g.rows.map((r) => `
          <div class="gl-row">
            <div class="gl-cn">${esc(r.cn)}<i>${esc(r.en)}</i></div>
            <div class="gl-note">${esc(r.note)}</div>
          </div>`).join("")}</div>
      </div>`).join("");
    $("#termFixed").innerHTML = D.termNotes.fixed.map((t, i) =>
      `<div class="term-item reveal" style="--d:${i * 45}ms"><b>${String(i + 1).padStart(2, "0")}</b><p>${esc(t)}</p></div>`).join("");
    $("#termPending").innerHTML = D.termNotes.pending.map((t, i) =>
      `<div class="term-item reveal" style="--d:${i * 45}ms"><b>?</b><p>${esc(t)}</p></div>`).join("");
  }

  /* ---------------- 附 ---------------- */
  function renderSources() {
    $("#sourceGrid").innerHTML = D.sources.map((s) => {
      const href = /\.html$/.test(s.u) ? s.u : "https://" + s.u;
      return `<a href="${esc(href)}" ${/\.html$/.test(s.u) ? "" : 'target="_blank" rel="noopener"'}><span>${esc(s.n)}</span><i>${esc(s.u)} ↗</i></a>`;
    }).join("");
    $("#caveat").innerHTML = D.caveat.map((c) => `<p>${esc(c)}</p>`).join("");
  }

  /* ---------------- 滚动 / 导航 / 抽屉 / 杂项 ---------------- */
  function initScroll() {
    const bar = $("#scrollProgress"), top = $("#topbar"), toTop = $("#toTop");
    const layers = $$(".hero-art .layer");
    const ids = ["xinf", "liucheng", "qunxiong", "bingpu", "shouji", "zhixian", "jiejv", "chengjiu", "bikeng", "shuyu", "laiyuan"];
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      top.classList.toggle("scrolled", y > 30);
      toTop.classList.toggle("show", y > 700);
      if (y < window.innerHeight * 1.3) layers.forEach((l, i) => { l.style.transform = `translateY(${(y * (0.03 + i * 0.035)).toFixed(1)}px)`; });
      let cur = "";
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 170) cur = id; });
      $$("#nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
    window.addEventListener("resize", () => { syncOpenHeights(); onScroll(); setHeroViewBox(); });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncOpenHeights);
  }

  function initDrawer() {
    const d = $("#drawer"), m = $("#drawerMask"), btn = $("#progressBtn");
    const open = () => { d.classList.add("open"); m.classList.add("open"); d.setAttribute("aria-hidden", "false"); };
    const close = () => { d.classList.remove("open"); m.classList.remove("open"); d.setAttribute("aria-hidden", "true"); };
    btn.addEventListener("click", () => d.classList.contains("open") ? close() : open());
    $("#drawerClose").addEventListener("click", close);
    m.addEventListener("click", close);
    $("#resetProgress").addEventListener("click", () => {
      if (!confirm("确定清空全部勾选进度？此操作不可撤销。")) return;
      state = {}; save(); refreshProgress();
      renderRoutes(); renderWeapons(); renderCollect(); renderTrophies(); renderBosses(); renderCodex();
      watch();
    });
    return { close, isOpen: () => d.classList.contains("open") };
  }

  function rippleAt(e) {
    if (reduce || !e) return;
    const r = document.createElement("div");
    r.className = "ink-ripple";
    r.style.left = (e.clientX || 0) + "px"; r.style.top = (e.clientY || 0) + "px";
    document.body.appendChild(r); setTimeout(() => r.remove(), 650);
  }
  function initMisc(drawer) {
    document.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".chip,.btn-primary,.btn-line,.progress-btn")) rippleAt(e);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { drawer.close(); if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        const inputs = [bossView === "codex" ? "#codexSearch" : "#bossSearch", "#weaponSearch", "#trophySearch"].map($).filter(Boolean);
        const target = inputs.find((i) => i.getBoundingClientRect().top > -100) || inputs[0];
        if (target) { target.focus(); target.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); }
      }
    });
  }

  /* ---------------- 渐显观察 ---------------- */
  let io;
  function watch(root) {
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal:not(.in)", root || document).forEach((el) => io.observe(el));
  }

  /* ---------------- 启动 ---------------- */
  function boot() {
    setHeroViewBox();
    initOpening();
    renderMulu(); renderMechanics(); renderRoutes(); initRoutes(); renderBosses(); initBossFilters(); initCodexFilters(); setBossView("codex");
    renderWeapons(); renderBuilds(); initWeaponFilters();
    renderCollect(); initCollect(); renderQuests(); initEndings();
    renderTrophies(); initTrophies(); renderWarnings(); renderGlossary(); renderSources();
    refreshProgress();
    const drawer = initDrawer();
    initScroll(); initMisc(drawer); watch();
    setTimeout(syncOpenHeights, 1200);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
