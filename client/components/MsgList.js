import MsgItem from './MsgItem'
import MsgInput from './MsgInput'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import fetcher from '../fetcher'
import useInfiniteScroll from '../hooks/useinfiniteScroll'


//input text create
const MsgList = () => {
  const { query } = useRouter()
  const userId = query.userId || query.userid || ''
  const [msgs, setMsgs] = useState([])
  const fetchMoreEl = useRef(null)
  const intersecting = useInfiniteScroll(fetchMoreEl)//훅

  const [editingId, setEditingId] = useState(null)
  const onCreate = async text => { //버튼을 눌러서 추가 하는 것이기 때문에 useEffect 사용 놉! 바로 async 사용 가능
    const newMsg = await fetcher('post', '/messages', { text, userId })
    if (!newMsg) throw Error('뭔가 이상한데?')
    setMsgs(() => [newMsg, ...msgs])
  }

  //input text update
  const onUpdate = async (text, id) => {
    const newMsg = await fetcher('put', `/messages/${id}`, { text, userId })
    if (!newMsg) throw Error('뭔가 이상한데?')
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1, newMsg)
      return newMsgs
    })
    doneEdit()
  }

  const onDelete = async id => {
    const receivedId = await fetcher('delete', `/messages/${id}`, { params: { userId } })
    console.log(typeof receivedId, typeof id) //params로 가져온 값과 query로 가져윤 값이 다름

    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === receivedId + '')
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1)
      return newMsgs
    })
  }

  const doneEdit = () => setEditingId(null)

  const getMessages = async () => {
    const msgs = await fetcher('get', '/messages')
    setMsgs(msgs)
  }

  //useEffect 내에서는 asic await 를 직접 호출 안하도록 되어있음
  useEffect(() => {
    getMessages()
  }, [])

  return (
    <>
      {userId && <MsgInput mutate={onCreate} />}
      <ul className='messages'>
        {
          msgs.map(x => (
            <MsgItem
              key={x.id}
              {...x}
              onUpdate={onUpdate}
              startEdit={() => setEditingId(x.id)}
              isEditing={editingId === x.id}
              onDelete={() => onDelete(x.id)}
              myId={userId}
            />)
          )
        }
      </ul >
      <div ref={fetchMoreEl} />
    </>
  )
}

export default MsgList;