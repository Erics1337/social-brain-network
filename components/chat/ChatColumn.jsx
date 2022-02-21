import {useContext, useEffect, useState} from 'react'
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatContext from "../../context/chatContext"
import { db } from '../../firebase';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
	limit,
	get,
	getDocs,
	getDoc,
	doc
} from "@firebase/firestore"


function ChatColumn({currentGroup}) {
    const { currentChat } = useContext(ChatContext)
    const [messages, setMessages] = useState([])


    
    // Post a message
    
    // Get messages for current chat
    useEffect(() => {
        console.log(currentChat)
        if (currentChat) {
            const unsubscribe = onSnapshot(
                query(
                    collection(db, "users"),
                    where("uid", "==", currentChat),
                    orderBy("timestamp", "asc")
                ),
                (messagesSnapshot) => {
                    setMessages([])
                    messagesSnapshot.docs.forEach((messageSnap) => {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                id: messageSnap.id,
                                text: messageSnap.data().text,
                                timestamp: messageSnap.data().timestamp,
                                amSender: messageSnap.data().uid === currentUser.uid,
                            },
                        ])
                    })
                }
            )
            return () => unsubscribe()
        }
        // Get latest message from them if there is one
        // Set messages to the messages


    }, [db, currentChat])

  return (
      <>
        <ChatHeader currentChat={currentChat} currentGroup={currentGroup} />
        <ChatMessages />
        <ChatInput />
      </>
  )
}

export default ChatColumn