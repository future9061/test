# 🎇목차

1. [💻 프로젝트 소개](#-프로젝트-소개)
2. [📁 directory 구조](#-directory-구조)
3. [⏲ 개발 기간](#-개발-기간)
4. [❗ 개발 환경](#-개발-환경)
5. [📌 주요 기능](#-주요-기능)
6. [🧾 code review](#-code-review)
8. [📢 Project review](#-project-review)

<br>

# 💻 프로젝트 소개

- API 통신을 위해 처음으로 server를 구축해 요청과 응답을 전부 경험해본 simple sns(toy) 입니다.
- React 기반 프로젝트로 next를 더해 SSR을 운영한다.
- 동일 프로젝트 내에 server와 client를 만들고, workspace를 구분 해 패키지를 별도로 관리한다.
- 로컬에서 데이터를 만들어 rest API로 CRUD 통신을 실행한다.
- node.js와 express 프레임 워크로 서버를 구축한다.
- 통신 함수를 모듈화 하여 HTTP method를 parameter로 받아 활용한다.
- 통신은 필요에 따라 REST API or GraphQL 중 선택해서 한다.
- 배포는 AWS 플랫폼으로 한다.

<br>

# 📁 directory 구조

- ### client directory

```
📦client
 ┣ 📂components
 ┃ ┣ 📜MsgInput.js
 ┃ ┣ 📜MsgItem.js
 ┃ ┗ 📜MsgList.js
 ┣ 📂hooks
 ┃ ┗ 📜useinfiniteScroll.js
 ┣ 📂pages
 ┃ ┣ 📜index.js
 ┃ ┣ 📜index.scss
 ┃ ┗ 📜_app.js
 ┣ 📜fetcher.js //axios로 server의 res를 받아오는 함수를 모듈화
 ┣ 📜next.config.js
 ┗ 📜package.json
```

- ### server directory

```
📦server
 ┣ 📂src
 ┃ ┣ 📂db
 ┃ ┃ ┣ 📜messages.json //로컬 목업 데이터
 ┃ ┃ ┗ 📜users.json //로컬 목업 데이터
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜messages.js //요청에 따른 함수
 ┃ ┃ ┗ 📜users.js
 ┃ ┣ 📜dbController.js
 ┃ ┗ 📜index.js //express & cors
 ┣ 📜nodemon.json
 ┗ 📜package.json
```

<br>

# ⏲ 개발 기간

- 2023.09.01 ~ 2023.09.03

<br>

# ❗ 개발 환경

- **Editor** : `vs code 1.77`
- **Framework**
  - client : `react(18.2.0)` `next(13.4.19)`
  - server : `express(4.18.2)`
- **Library**

  - client : `axios(1.5.0)` `react-dom(18.2.0)` `sass(1.66.1)`
  - server : `uuid(9.0.0)`

  <br>

# 📌 주요 기능

- 새 글 쓰기 기능

  - input에 text 입력 시

- 글 수정 기능

- 글 삭제 기능
