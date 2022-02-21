import React from 'react'

function ChatBubble({text, timestamp, amSender}) {
  return (
    <li className={`flex justify-${amSender ? 'end' : 'start'}`}>
    <div className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ${amSender && 'bg-gray-100'}`}>
      <span className="block">{text}</span>
    </div>
  </li>
  )
}

export default ChatBubble