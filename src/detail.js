// ============================================================
// 상세 페이지 공용 로직 (pages/chatbot.html, pages/skinai.html)
// 1) 상단 목차 클릭 시 해당 섹션으로 부드럽게 이동 (sticky 목차 높이 보정)
// 2) 스크롤 위치에 맞춰 목차 강조 (스크롤스파이)
// 3) 본문 속 #dd-* 링크 / 주소(#dd-c)로 Deep Dive 카드를 펼치고 이동
// ============================================================
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var toc = document.querySelector(".toc");

  function offset() { return (toc ? toc.getBoundingClientRect().height : 0) + 12; }
  function scrollToEl(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - offset();
    window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
  }

  // Deep Dive 카드(#dd-*) 열고 이동
  function openAndGo(id, push) {
    var t = document.getElementById(id);
    if (!t) return false;
    if (t.tagName === "DETAILS") t.open = true;
    scrollToEl(t);
    if (push) history.replaceState(null, "", "#" + id);
    return true;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#dd-"]');
    if (!a) return;
    if (openAndGo(a.getAttribute("href").slice(1), true)) e.preventDefault();
  });
  if (/^#dd-/.test(location.hash)) openAndGo(location.hash.slice(1), false);
  window.addEventListener("hashchange", function () {
    if (/^#dd-/.test(location.hash)) openAndGo(location.hash.slice(1), false);
  });

  if (!toc) return;

  // 목차 클릭 이동
  var links = Array.prototype.slice.call(toc.querySelectorAll("a"));
  toc.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
    history.replaceState(null, "", link.getAttribute("href"));
  });

  // 스크롤스파이
  var sections = links
    .filter(function (l) { return !l.hidden; })
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (l) {
      var on = l.getAttribute("href") === "#" + id;
      l.classList.toggle("active", on);
      if (on) l.setAttribute("aria-current", "true");
      else l.removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }
})();
