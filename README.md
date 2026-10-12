# 김정환의 portfolio

순수 HTML / CSS / JavaScript로 만든 정적 포트폴리오 사이트입니다. (GitHub Pages 배포)

## 폴더 구조

```
portfolio/
 ├─ index.html              메인 (프로젝트 목록 + 경력)
 ├─ project-skinai.html     프로젝트 상세: Skin AI
 ├─ project-chatbot.html    경력 상세: 인턴십 챗봇 구축
 ├─ src/                    JavaScript
 │   ├─ bind-config.js          메인·챗봇 페이지가 같이 쓰는 값 채우기
 │   ├─ project-skinai.js       Skin AI 페이지 (목차, 차트)
 │   ├─ project-chatbot.js      챗봇 페이지 (수치 표시, 목차, 접이식)
 │   └─ data/
 │       └─ chatbot-data.js     회사명·기간·수치 등 바꾸는 값
 └─ images/                 스크린샷
     └─ chatbot/
```

CSS는 각 HTML 파일 안(`<style>`)에 들어 있습니다.

## 로컬에서 보기 (VSCode)

`index.html`을 열고 Live Server 확장의 **Open with Live Server**를 누릅니다.

## 값 바꾸기

경력 카드와 챗봇 페이지의 회사명, 부서, 과정명, 기간, 수치는 모두 `src/data/chatbot-data.js` 한 파일에서 바꿉니다.
값이 비어 있거나 `{{...}}` 그대로면 화면에 표시되지 않습니다.

## 새 프로젝트 추가

1. `project-이름.html`과 `src/project-이름.js`를 같은 이름으로 만듭니다. (파일명은 소문자 영문과 `-`만 사용)
2. `index.html`의 `.project-grid`에서 빈 칸(`p-card empty`) 하나를 새 카드로 바꿉니다.

## 스크린샷 넣기

`images/페이지이름/` 안에 `01-설명.webp`처럼 넣고(16:9 권장, 민감 정보 마스킹), HTML의 `.shot-ph` 블록을 `<img>`로 바꿉니다.
자세한 방법은 `project-chatbot.html` 안 주석에 있습니다.

## 스크립트 로드 순서

챗봇·메인 페이지는 `src/data/chatbot-data.js` → `src/bind-config.js` → 페이지 JS 순서로 불러옵니다. 순서를 바꾸지 마세요.
