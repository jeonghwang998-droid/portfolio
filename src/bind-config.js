// ============================================================
// 공용: chatbot-data.js 의 config 값을 [data-bind="..."] 요소에 채웁니다.
// 값이 비어 있으면 HTML에 적어 둔 기본 문구를 그대로 둡니다.
// (index.html, project-chatbot.html 두 페이지에서 같이 사용)
// ============================================================
(function () {
  "use strict";
  var cfg = (window.CHATBOT_DATA && window.CHATBOT_DATA.config) || {};
  var map = {
    company: cfg.companyName,
    department: cfg.department,
    program: cfg.program,
    job: cfg.job,
    period: cfg.period,
    duration: cfg.duration,
  };
  function filled(v) {
    if (v === undefined || v === null) return false;
    var s = String(v).trim();
    return s !== "" && !/^\{\{.*\}\}$/.test(s);
  }
  document.querySelectorAll("[data-bind]").forEach(function (n) {
    var key = n.getAttribute("data-bind");
    if (key in map && filled(map[key])) n.textContent = String(map[key]).trim();
  });
})();
