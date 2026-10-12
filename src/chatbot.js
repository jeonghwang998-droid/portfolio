// ============================================================
// 인턴십(챗봇) 데이터 렌더링 — 메인 경력 카드와 pages/chatbot.html 에서 같이 사용
// 1) chatbot-data.js 의 값으로 수치·상태·개수를 렌더링
//    (값이 비어 있거나 {{...}} 상태면 화면에 표시하지 않음)
// 2) RAG 개념 구조: 단계 hover/포커스/클릭 시 설명 표시
// ※ 목차 이동은 detail.js, 메뉴 강조·등장 효과는 main.js 가 맡습니다.
// ============================================================
(function () {
  "use strict";

  var D = window.CHATBOT_DATA || {};
  var M = D.metrics || {};

  // 값이 채워졌는지 판단: null/빈 문자열/{{...}} 형태는 "비어 있음"
  function isFilled(v) {
    if (v === undefined || v === null) return false;
    var s = String(v).trim();
    return s !== "" && !/^\{\{.*\}\}$/.test(s);
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  // 회사명·부서·과정·직무·기간은 bind-config.js 에서 채웁니다.

  // ---------- 야간 문의 수치 ----------
  var night = M.nightInquiries || {};
  var hasNight =
    isFilled(night.before) && isFilled(night.after) &&
    isFinite(Number(night.before)) && isFinite(Number(night.after)) &&
    Number(night.before) > 0;

  // unit 예: "건/주" → 단위 "건", 기간 "주"
  var unitParts = isFilled(night.unit) ? String(night.unit).split("/") : [];
  var unitName = (unitParts[0] || "건").trim();
  var per = (unitParts[1] || "").trim();
  var approx = night.approx !== false ? "약 " : "";

  function nightSummary() {
    return "야간 고객 문의 " + approx + night.before + unitName + " → " + approx + night.after + unitName + (per ? " / " + per : "");
  }

  function buildNightMetric(variant) {
    var wrap = el("div", "night-metric night-" + variant);
    wrap.setAttribute("role", "group");
    wrap.setAttribute(
      "aria-label",
      "야간 고객 문의 도입 전 " + approx + night.before + unitName + ", 도입 후 " + approx + night.after + unitName + (per ? " (" + per + "당)" : "")
    );

    wrap.appendChild(el("p", "nm-title", "야간 고객 문의"));

    var nums = el("div", "nm-nums");

    function col(label, value, cls) {
      var c = el("div", "nm-col " + cls);
      c.appendChild(el("span", "nm-label", label));
      var v = el("span", "nm-val");
      if (approx) v.appendChild(el("span", "nm-approx", "약"));
      v.appendChild(document.createTextNode(String(value)));
      v.appendChild(el("span", "nm-unit", unitName));
      c.appendChild(v);
      return c;
    }

    nums.appendChild(col("도입 전", night.before, "before"));
    var arrow = el("span", "nm-arrow", "→");
    arrow.setAttribute("aria-hidden", "true");
    nums.appendChild(arrow);
    nums.appendChild(col("도입 후", night.after, "after"));
    if (per) nums.appendChild(el("span", "nm-per", "/ " + per));
    wrap.appendChild(nums);

    // 막대: 두 값의 비율로만 그림 (퍼센트 같은 파생 수치는 계산·표시하지 않음)
    var ratio = Math.max(0, Math.min(1, Number(night.after) / Number(night.before)));
    var bars = el("div", "nm-bars");
    bars.setAttribute("aria-hidden", "true");
    [["before", 1], ["after", ratio]].forEach(function (b) {
      var bar = el("div", "nm-bar " + b[0]);
      var fill = el("i");
      fill.style.setProperty("--w", b[1]);
      bar.appendChild(fill);
      bars.appendChild(bar);
    });
    wrap.appendChild(bars);

    // 각주: 채워진 항목만 표시, 둘 다 비면 렌더링하지 않음
    var fn = night.footnote || {};
    var parts = [];
    if (isFilled(fn.basis)) parts.push("측정 기준: " + fn.basis);
    if (isFilled(fn.period)) parts.push("기간: " + fn.period);
    if (parts.length) wrap.appendChild(el("p", "nm-foot", parts.join(" / ")));

    return wrap;
  }

  document.querySelectorAll(".js-night-metric").forEach(function (host) {
    if (hasNight) host.appendChild(buildNightMetric(host.getAttribute("data-variant") || "result"));
  });

  document.querySelectorAll('[data-bind="night-summary"]').forEach(function (n) {
    if (hasNight) n.textContent = nightSummary();
  });

  // ---------- 추가 성과 (값이 있을 때만) ----------
  var extraDefs = [
    ["businessHoursReduction", "업무시간 상담 감소율"],
    ["resolutionRate", "해결률"],
    ["responseAccuracy", "응답 정확도"],
    ["costSaving", "비용 절감"],
  ];
  var extraHost = document.getElementById("extra-metrics");
  var anyExtra = false;
  if (extraHost) {
    extraDefs.forEach(function (d) {
      if (!isFilled(M[d[0]])) return;
      anyExtra = true;
      var card = el("div", "xm");
      card.appendChild(el("span", "xm-label", d[1]));
      card.appendChild(el("span", "xm-val", String(M[d[0]])));
      extraHost.appendChild(card);
    });
  }
  var caution = document.getElementById("resolution-caution");
  if (caution) caution.hidden = !isFilled(M.resolutionRate);

  // ---------- 표시 조건 (data-needs) ----------
  var flags = { night: hasNight, result: hasNight || anyExtra };
  document.querySelectorAll("[data-needs]").forEach(function (n) {
    if (!flags[n.getAttribute("data-needs")]) n.hidden = true;
  });
  document.querySelectorAll("[data-unless]").forEach(function (n) {
    if (flags[n.getAttribute("data-unless")]) n.hidden = true;
  });
  if (extraHost && !anyExtra) extraHost.hidden = true;

  // ---------- 상태 태그 ----------
  var S = D.statuses || {};
  document.querySelectorAll("[data-status]").forEach(function (n) {
    var v = S[n.getAttribute("data-status")];
    if (isFilled(v)) {
      n.textContent = v;
      n.hidden = false;
    } else {
      n.hidden = true;
    }
  });

  // ---------- 본문 속 숫자 (비면 숫자만 빠짐) ----------
  var C = D.counts || {};
  document.querySelectorAll("[data-count]").forEach(function (n) {
    var v = C[n.getAttribute("data-count")];
    n.textContent = isFilled(v)
      ? (n.getAttribute("data-pre") || "") + v + (n.getAttribute("data-post") || "")
      : "";
  });

  // ---------- RAG 개념 구조: 단계 설명 ----------
  var ragSteps = document.querySelectorAll(".rag-step");
  var panelTitle = document.getElementById("rag-panel-title");
  var panelDesc = document.getElementById("rag-panel-desc");

  function selectStep(btn) {
    ragSteps.forEach(function (b) {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    if (panelTitle) panelTitle.textContent = btn.getAttribute("data-title") || btn.textContent;
    if (panelDesc) panelDesc.textContent = btn.getAttribute("data-desc") || "";
  }

  ragSteps.forEach(function (btn) {
    btn.addEventListener("mouseenter", function () { selectStep(btn); });
    btn.addEventListener("focus", function () { selectStep(btn); });
    btn.addEventListener("click", function () { selectStep(btn); });
  });
  if (ragSteps.length) selectStep(ragSteps[0]);
})();
