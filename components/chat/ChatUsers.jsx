import React from 'react'
import ChatUser from './ChatUser';

function ChatUsers() {
  return (
    <ul className="overflow-auto h-[32rem]">
    <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
    <ChatUser />
    <ChatUser />
    <ChatUser />
  </ul>
  )
}

export default ChatUsers