# 🎇목차

1. [💻 프로젝트 소개](#-프로젝트-소개)
2. [📁 directory 구조](#-directory-구조)
3. [⏲ 개발 기간](#-개발-기간)
4. [❗ 개발 환경](#-개발-환경)
5. [📌 주요 기능](#-주요-기능)
6. [🧾 code review](#-code-review)
   - [응답 함수 모듈](#-응답-함수-모듈)
   - [요청 함수 모듈](#-요청-함수-모듈)
   - [데이터 불러오기(Read)](#-데이터-불러오기read)
   - [새 글 쓰기 기능(Create)](#-새-글-쓰기-기능create)
   - [글 수정 기능(Update)](#-글-수정-기능update)
7. [📢 Project review](#-project-review)

<br>

# 💻 프로젝트 소개

#### 🤔 저의 깃허브를 방문한 사람들이 프로젝트나 소스코드를 본 후 , 그에 대한 코멘트를 받을 수 없다는 게 아쉬웠습니다.

조언과 격려를 받을 수 있는 코멘트 프로젝트 입니다.

- JSON 형태의 목업 데이터를 만들어 Rest API로 통신합니다.
- node.js와 express 프레임 워크로 서버를 구축합니다.ㄴ
- React 기반 프로젝트로 next를 더해 SSR을 운영합니다.
- 동일 프로젝트 내에 server와 client를 만들고, workspace를 구분 해 패키지를 별도로 관리합니다.
- 통신 함수를 모듈화 하여 HTTP method를 parameter로 받아 활용합니다.
- AWS 플랫폼으로 배포를 해봤습니다.

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
 ┃ ┣ 📜dbController.js //json file의 데이터를 가져와 read, write
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
- **Runtime** : `Node.js`
- **Framework**
  - client : `react(18.2.0)` `next(13.4.19)`
  - server : `express(4.18.2)`
- **Library**

  - client : `axios(1.5.0)` `react-dom(18.2.0)` `sass(1.66.1)`
  - server : `uuid(9.0.0)`

  <br>

# 📌 주요 기능

- 데이터 불러오기(Read)

<br >

- 새 글 쓰기 기능(Create)
  - input 내용 입력 시
  - input은 create, update 두 군데에서 사용됩니.

<br >

- 글 수정 기능(Update)
  - 작성한 코멘트에 수정 버튼을 누르면 새 입력창이 나옵니다.
  - 새 글을 작성 후 확인 버튼을 누르면 Put으로 text 데이터만 변경됩니다.

<br >

- 글 삭제 기능(Delete)

<br >

# 🧾 code review

#### ✔ 응답 함수 모듈

- json 파일의 데이터를 불러오기 때문에 fs로 데이터를 읽고 쓴다.
- resolve로 데이터의 기본 경로를 저장해둔다.
- 요청 메소드에 따른 read와 write 함수를 각각 만든다.

```javascript
//dbController.js

const basePath = resolve(); //현재 경로가 base로 잡힘

const filenames = {
  messages: resolve(basePath, "src/db/messages.json"),
  users: resolve(basePath, "src/db/user.json"),
};

//파일의 데이터를 읽고, 변경하는 함수
export const readDB = (target) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
  } catch (err) {
    console.log(err);
  }
};

export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
```

- 배열에 각 메소드의 경로, 콜백함수를 지정해놓는다

```javascript
//routes 폴더의 messages.js

const messagesRoute = [
  {
    method: "get",
    route: "/messages",
    handler: (req, res) => {
      const msgs = readDB("messages");
      res.send(msgs);
    },
  },
  {
    method: "post",
    route: "/messages",
    handler: ({ body }, res) => {
      //create이기 때문에 body로 데이터 가져옴
      const msgs = readDB("messages");
      const newMsg = {
        id: v4(), //uuid
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      msgs.unshift(newMsg); //배열 첫번째에 넣는다.
      writeDB("messages", msgs); //기존 데이터에 추가함
      res.send(newMsg); //response는 새로운 값만 보낸다.
    },
  },
  {
    method: "put",
    route: "/messages/:id", //client id랑 server의 id가 맞지 않는 경우를 대비해 예외처리
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = readDB("messages");
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메세지가 없습니다";
        if (msgs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        const newMsg = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, newMsg);
        setMsgs(msgs);
        res.send(newMsg);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
  //...delete는 put과 비슷하기 때문에 생략,
];
```

<br >

#### ✔ 요청 함수 모듈

- axios로 데이터 요청 함수를 모듈화한다.

```javascript
//fetcher.js

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/"; //기본값 지정해두면 전체 url이 아닌 router만 적을 수 있다.

const fetcher = async (method, url, ...rest) => {
  const res = await axios[method](url, ...rest); //rest는 put과 post가 새 데이터를 받아오는 공간
  return res.data;
};

export default fetcher;
```

<br >

##### ✔ 데이터 불러오기(Read)

```javascript
//MsgList.js

const getMessages = async () => {
  const msgs = await fetcher("get", "/messages");
  setMsgs(msgs);
};

useEffect(() => {
  //useEffect에서 직접적으로 async/await 를 쓸 수 없다.
  getMessages();
}, []);
```

<br >

#### ✔ 새 글 쓰기 기능(Create)

```javascript
//MsgList.js

const onCreate = async (text) => {
  const newMsg = await fetcher("post", "/messages", { text });
  //기존의 메세지에서 text 부분만 새로 업데이트 한다.
  setMsgs((msgs) => [newMsg, ...msgs]); //새 메세지를 상단에 넣는다.
};
```

<br >

#### ✔ 글 수정 기능(Update)

```javascript
//MsgList.js

const onUpdate = async (text, id) => {
  //특정 id와 text를 받아온다.
  const newMsg = await fetcher("put", `/messages/${id}`, { text });
  setMsgs((msgs) => {
    const targetIndex = msgs.findIndex((msg) => msg.id === id);
    const newMsgs = [...msgs];
    newMsgs.splice(targetIndex, 1, newMsg); //이전 데이터에서 해당 데이터만 slice하고 받아온 새로운 메세지를 넣는다.
    return newMsgs;
  });
};
```
