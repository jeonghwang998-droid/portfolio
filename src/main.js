// ============================================================
// 메인(index.html) 로직
// 1) 스크롤하면 부드럽게 나타나는 효과 (.reveal)
// 2) 스크롤 위치에 맞춰 상단 메뉴 강조
// ※ 경력·프로젝트 카드는 일반 링크라서 별도 로직이 필요 없습니다.
// ============================================================
(function () {
  "use strict";

  clearTimeout(window.__revealTimer);   // 스크립트가 정상 시작하면 안전장치 해제
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 스크롤 등장 효과
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function finish(el) {
    // 등장이 끝나면 효과 클래스를 지워서 hover 효과와 겹치지 않게 함
    setTimeout(function () { el.classList.remove("reveal", "in"); }, 1600);
  }
  if ("IntersectionObserver" in window && !reduce) {
    var rio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          rio.unobserve(en.target);
          finish(en.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { rio.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.remove("reveal"); });
  }

  // 상단 메뉴 강조 (스크롤스파이)
  var links = Array.prototype.slice.call(document.querySelectorAll(".topline nav a"));
  var sections = links
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
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }
})();
