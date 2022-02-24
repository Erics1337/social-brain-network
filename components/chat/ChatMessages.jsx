import React from 'react'
import { auth } from '../../firebase';
import ChatBubble from './ChatBubble';


function ChatMessages({messages}) {
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
    <ul className="space-y-2">
      {messages.map((message, i) => (
        <ChatBubble key={i} amSender={message.to === auth.currentUser.uid} text={message.text} timestamp={message.timestamp}/>
      ))}
    </ul>
  </div>
  )
}

export default ChatMessages