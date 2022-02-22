
import { useEffect, useState } from 'react';
import { getDoc, doc, onSnapshot, query, collection, where } from '@firebase/firestore';
import { db } from '../../firebase';

function ChatHeader({currentChat, currentGroup}) {
  const [chatImg, setChatImg] = useState('');

  useEffect(() => {
    if (currentChat) {
        getDoc(doc(db, 'users', currentChat.uid)).then((user) => {
          setChatImg(user.data().profilePic);
        })
    } else {
      setChatImg(`https://ui-avatars.com/api/?name=${currentGroup}`)
    }
    console.log('chatImg', chatImg);
  }, [currentChat, currentGroup])

  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
    <img className="object-cover w-10 h-10 rounded-full"
      src={chatImg} alt="username" />
    <span className="block ml-2 font-bold text-gray-600">{currentChat ? currentChat.username : currentGroup}</span>
    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
    </span>
  </div>
  )
}

export default ChatHeader