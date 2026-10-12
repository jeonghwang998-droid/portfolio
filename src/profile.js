// ============================================================
// 소개 칸과 기술 스택 칸을 profile-data.js 의 값으로 그립니다.
// 비어 있는 항목은 그리지 않고, 기술 스택이 통째로 비면 칸과 메뉴를 숨깁니다.
// ============================================================
(function () {
  "use strict";
  var D = window.PROFILE_DATA || {};

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function filled(v) { return v !== undefined && v !== null && String(v).trim() !== ""; }

  // 소개 칸
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  var factsHost = document.getElementById("facts");
  if (factsHost && Array.isArray(D.facts)) {
    clear(factsHost);              // HTML에 적어 둔 기본 내용을 값 파일의 내용으로 교체
    D.facts.forEach(function (f) {
      if (!filled(f.value)) return;
      var box = el("div", "fact");
      box.appendChild(el("div", "k", f.label || ""));
      box.appendChild(el("div", "v", f.value));
      if (filled(f.sub)) box.appendChild(el("div", "s", f.sub));
      factsHost.appendChild(box);
    });
    // 칸 수에 맞춰 열 개수를 맞춤 (1~3칸)
    var n = factsHost.children.length;
    if (n > 0 && n < 3) factsHost.style.gridTemplateColumns = "repeat(" + n + ", 1fr)";
  }

  // 기술 스택
  var grid = document.getElementById("sk-grid");
  if (grid && Array.isArray(D.skills)) {
    clear(grid);
    D.skills.forEach(function (s, i) {
      if (!s.items || !s.items.length) return;
      var card = el("article", "sk-card reveal");
      card.style.setProperty("--d", (i * 0.07).toFixed(2) + "s");
      card.appendChild(el("h3", "", s.title || ""));
      if (filled(s.desc)) card.appendChild(el("p", "", s.desc));
      var chips = el("div", "sk-chips");
      s.items.forEach(function (it) { chips.appendChild(el("span", "sk-chip", it)); });
      card.appendChild(chips);
      grid.appendChild(card);
    });
    if (!grid.children.length) {
      var sec = document.getElementById("skills");
      if (sec) sec.hidden = true;
      var link = document.querySelector('.topline nav a[href="#skills"]');
      if (link) link.hidden = true;
    }
  }
})();
