import { useEffect, useState } from "react"

const useInfiniteScroll = targetEl => {
  const [intersecting, setIntersecting] = useState(false) //intersecting요소가 화면에 보이면 true 아니면 false
  const observer = new IntersectionObserver(entries => setIntersecting(entries.some(entry => entry.isIntersecting)))
  //IntersectionObserver 객체는 파라미터로 관찰 대상 요소를 받음
  //entry(관찰 요소) 객체는 관찰중인 요소와 관련된 정보가 들어있으며 그 중 하나가 isIntersecting옵션이다.
  //isIntersecting은 entry의 속성이 true인지 false인지 판단하고 객체가 화면에 보이면 true 반환한다
  //some은 배열 메소드 중 하나로 배열 내에서 주어진 조건을 만족하는 요소 찾으면 true 반환(하나라도)

  useEffect(() => {
    if (targetEl.current) observer.observe(targetEl.current)
    //IntersectionObserver 객체의 observer 메소드: 특정 dom 요소를 관찰대상으로 추가하는 역할을 함

    return () => {
      observer.disconnect()
    }
  }, [targetEl.current])

  return intersecting
}

export default useInfiniteScroll
