import axios from 'axios'
//데이터를 받아오는 코드
axios.defaults.baseURL = 'http://localhost:8000' //naseurl지정해서 코드 짧게

const fetcher = async (method, url, ...rest) => {
  const res = await axios[method](url, ...rest)
  return res.data
}

export default fetcher
//rest를 넣는 이유
// 각각의 메소드들이 차이가 있기 때문
// get: axios.get(url, config)
// delete : axios.delete(url, config) config 는 기타 설정에 다 들어가는 부분
// post : axios.post(url,data) //새로 받는 데이터를 파라미터로 반드시 받아와야
// put : axios.put(url,data)//새로 받는 데이터를 파라미터로 반드시 받아와야
