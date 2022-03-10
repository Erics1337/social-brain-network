import {useState} from 'react'
import Moment from 'react-moment'

function ChatBubble({text, timestamp, amSender}) {
  const [showDate, setShowDate] = useState(false)
  const handleShowDate = () => setShowDate(!showDate)

  return (
    <>
    <li className={`flex hover:cursor-pointer justify-${amSender ? 'start' : 'end'}`}
      onClick={handleShowDate}>
      <div className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow dark:text-gray-100 dark:bg-gray-500 ${amSender && 'bg-gray-100'}`}>
        <span className="block">{text}</span>
      </div>
    </li>
    {showDate && (
      <div className={`flex justify-${amSender ? 'start' : 'end'}`}>
        <Moment
          interval={1000}
          fromNow
          className='pr-5 text-xs'>
          {timestamp?.toDate()}
        </Moment>
        </div>
    )}
    </>
  )
}

export default ChatBubble