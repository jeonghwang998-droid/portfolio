# Portfolio Site — 1단계 (정적)

DB/백엔드 개발자 지망 포트폴리오. 지금은 정적 HTML/CSS/JS로 시작하고,
도메인 구매 후 백엔드(Flask/FastAPI + DB)를 붙여 2단계로 확장한다.

## 1. 폴더 구조

```
portfolio/
 ├─ index.html              # 메인 (자기소개, 스킬, 연락처)
 ├─ projects.html            # 프로젝트 목록
 ├─ project-iot.html         # 상세: IoT 온도 모니터링
 ├─ project-terrarium.html   # 상세: 테라리움 자동화
 ├─ assets/
 │   ├─ css/style.css        # 전역 스타일 (디자인 토큰 포함)
 │   ├─ js/main.js           # JS (지금은 최소, 2단계에서 API 연동 추가)
 │   ├─ img/                 # 스크린샷/썸네일 이미지 넣는 곳
 │   └─ resume.pdf           # 이력서 (직접 추가 필요)
 └─ README.md
```

## 2. 디자인 컨셉

"쿼리 콘솔" 테마 — 터미널/SQL 셸 느낌으로 통일.
- 네비게이션: `whoami`, `/home`, `/projects` 처럼 파일 경로/명령어 스타일
- 색상: 다크 배경(`#0d1117`) + 터미널 그린(`#7ee787`) + SQL 키워드 앰버(`#ffa657`)
- 폰트: 제목/라벨은 JetBrains Mono(모노스페이스), 본문은 Inter
- 색상/폰트를 바꾸고 싶으면 `assets/css/style.css` 최상단 `:root` 변수만 수정하면 전체 반영됨

## 3. 로컬에서 실행하기 (VSCode)

별도 빌드 도구 없이 순수 HTML/CSS/JS라 아래 중 편한 방법으로 확인:

- VSCode 확장 **Live Server** 설치 → `index.html` 우클릭 → "Open with Live Server"
- 또는 터미널에서:
  ```
  cd portfolio
  python -m http.server 5500
  ```
  브라우저에서 `http://localhost:5500` 접속

## 4. 콘텐츠 채워야 할 부분 (TODO)

- [ ] `index.html` — 이메일, GitHub 링크, `assets/resume.pdf` 실제 파일 추가
- [ ] `project-iot.html`, `project-terrarium.html` — 기간, 레포 링크, 스크린샷, 트러블슈팅 서술
- [ ] `assets/img/` — 프로젝트 스크린샷, 다이어그램 추가
- [ ] 새 프로젝트 추가 시: `project-iot.html` 복사 → 내용 수정 → `projects.html`에 카드 추가

## 5. 배포 (도메인 사기 전에도 가능)

**추천: Vercel** (GitHub 연동 시 push마다 자동 배포, 무료)

1. GitHub에 이 폴더를 레포로 push
2. https://vercel.com 가입 → "Add New Project" → 레포 선택 → Deploy
3. `xxx.vercel.app` 주소로 즉시 배포 완료 (커스텀 도메인 연결 전까지 이 주소로 공유 가능)

Netlify도 동일한 흐름으로 가능 (drag & drop 배포도 지원).

## 6. 나중에 개인 도메인 연결할 때

1. 가비아/후이즈(국내) 또는 Cloudflare Registrar(해외)에서 도메인 구매
2. 도메인 네임서버를 Cloudflare로 변경 (무료 DNS + SSL 자동)
3. Cloudflare DNS에서 Vercel이 안내하는 `A`/`CNAME` 레코드 추가
4. Vercel 프로젝트 설정 → Domains → 구매한 도메인 입력 → 연결 확인
5. HTTPS는 자동 적용됨 (Let's Encrypt)

## 7. 2단계: 백엔드/DB 붙이기 (다음 로드맵)

지금 이 정적 사이트에 아래 기능을 추가하며 백엔드 실력을 어필:

| 기능 | 설명 | 붙이는 순서 |
|---|---|---|
| 방명록 | 방문자가 메시지 남기기 | Flask API + MySQL/Supabase `guestbook` 테이블 |
| 조회수 | 프로젝트별 조회수 카운트 | `project_views` 테이블 + 증가 API |
| 문의 폼 | 연락처 섹션에 실제 폼 연결 | `contacts` 테이블 + 이메일 알림(선택) |
| 관리자 페이지 | 프로젝트 목록을 DB화 + 로그인 후 CRUD | 별도 관리자 라우트, 인증 추가 |

백엔드는 `api.mydomain.com` 서브도메인으로 분리 배포(Render/Railway 추천) →
프론트(Vercel)와 백엔드(Render)가 명확히 나뉜 구조 자체가 포트폴리오 어필 포인트가 됨.

`assets/js/main.js`에 API 연동 로직을 추가하면 됨 (파일 안에 예시 주석 있음).
