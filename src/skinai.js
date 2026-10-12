// ============================================================
// Skin AI 상세 페이지: 아키텍처 차트(mermaid)를 불러와서 그립니다.
// 불러오기에 실패하면 차트 원문이 그대로 보입니다.
// ============================================================
(function () {
  "use strict";
  var MERMAID_SRC = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";

  function render() {
    if (!window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        fontSize: "12px",
        primaryColor: "#fdfdfc",
        primaryBorderColor: "#1c1c1a",
        primaryTextColor: "#1c1c1a",
        lineColor: "#9b9b95",
        secondaryColor: "#fdfdfc",
        tertiaryColor: "#fdfdfc",
        clusterBkg: "#fdfdfc",
        clusterBorder: "#dcdcd6",
        edgeLabelBackground: "#ffffff",
      },
      flowchart: { curve: "basis" },
    });
    window.mermaid.run({ nodes: Array.prototype.slice.call(document.querySelectorAll(".mermaid")) });
  }

  if (window.mermaid) return render();
  var s = document.createElement("script");
  s.src = MERMAID_SRC;
  s.onload = render;
  document.head.appendChild(s);
})();
