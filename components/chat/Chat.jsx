import React from 'react'
import ChatUser from './ChatUser';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatUsers from './ChatUsers';

function Chat() {
  return (
    <div className="mx-auto mt-5">
      <div className="min-w-full border rounded sm:grid sm:grid-cols-3">
          {/* Side Column */}
        <div className="border-r border-gray-300 sm:col-span-1">
            {/* Search Box */}
          {/* <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div> */}

          {/* Broadcast Button */}
          <div className="mx-3 my-3 grid place-items-center">
            <div className="relative text-gray-600">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Broadcast</button>
            </div>
            </div>

            {/* Users */}
          <ChatUsers />
        </div>
        {/* Chat Column */}
        <div className="col-span-2 block">
          <div className="w-full">
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat