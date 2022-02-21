import React from 'react'
import ChatBubble from './ChatBubble';


function ChatMessages({messages}) {
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
    <ul className="space-y-2">
      <ChatBubble amSender={false} text={'Hi'} />
      <ChatBubble amSender={true} text={'Hiiii'} />
      <ChatBubble amSender={true} text={'how are you?'} />
      <ChatBubble amSender={false} text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'} />
      <ChatBubble amSender={true} text={'fuck you'} />
    </ul>
  </div>
  )
}

export default ChatMessages