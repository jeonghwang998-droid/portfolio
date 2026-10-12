/* ============================================================
   소개 · 기술 스택 데이터
   이 파일의 값만 바꾸면 메인 페이지의 소개 칸과 기술 스택 칸이 갱신됩니다.

   규칙
   - 비어 있는 항목(value 가 "" 인 소개 칸, items 가 빈 기술 묶음)은 화면에 나오지 않습니다.
   - 실제로 다뤄본 것만 적어 주세요. 면접에서 질문이 들어올 수 있습니다.
   ============================================================ */
window.PROFILE_DATA = {
  // 소개 칸 (맨 위). label / value / sub 순서로 보입니다.
  facts: [
    { label: "EDUCATION", value: "백석대학교", sub: "IT 전공 · 2027.02 졸업 예정" },
    { label: "TARGET", value: "백엔드 · DB 개발", sub: "Backend / Database" },
    { label: "CERTIFICATIONS", value: "정보처리기사 · SQLD", sub: "" },
    // 추가하려면 아래처럼 한 줄 더 적으세요. (예: 학점, 거주지 등 — 공개해도 되는 것만)
    // { label: "GPA", value: "", sub: "" },
  ],

  // 기술 스택. title / desc / items
  skills: [
    { title: "Backend", desc: "API 서버와 인증·업로드 처리", items: ["Node.js", "Express", "JWT 인증"] },
    { title: "Database", desc: "스키마 설계와 구축", items: ["PostgreSQL", "Supabase", "SQL"] },
    { title: "Frontend", desc: "UI/UX 설계와 클라이언트 로직", items: ["HTML", "CSS", "JavaScript"] },
    { title: "Tools & Collaboration", desc: "협업과 운영에 쓴 도구", items: ["Git", "GitHub", "Channel Talk"] },
  ],
};
