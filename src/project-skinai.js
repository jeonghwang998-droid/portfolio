// ============================================================
// Skin AI 프로젝트 상세 페이지 로직
// 1) mermaid 다이어그램 초기화 (사이트 톤에 맞춘 흑백 테마)
// 2) 목차(TOC) 클릭 시 해당 섹션으로 부드럽게 스크롤 (sticky 헤더 높이 보정)
// 3) 스크롤 위치에 따라 현재 보고 있는 섹션을 목차에서 하이라이트 (scrollspy)
// ============================================================

if (window.mermaid) {
  mermaid.initialize({
    startOnLoad: true,
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
}

document.addEventListener("DOMContentLoaded", () => {
  const toc = document.querySelector(".toc");
  if (!toc) return;

  const tocLinks = Array.from(toc.querySelectorAll("a"));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  // 클릭 시 목차 높이만큼 보정해서 부드럽게 이동
  toc.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const offset = toc.getBoundingClientRect().height + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", link.getAttribute("href"));
  });

  // 스크롤 위치에 따라 현재 섹션에 해당하는 목차 링크 강조 (scrollspy)
  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    {
      // 화면 상단(sticky 목차 바로 아래) 근처에 걸리는 섹션을 "현재 섹션"으로 판단
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
