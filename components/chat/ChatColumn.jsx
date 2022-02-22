import {useContext, useEffect, useState} from 'react'
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatContext from "../../context/chatContext"
import { auth, db } from '../../firebase';
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
    
    // Get messages
    useEffect(() => {
        console.log(currentChat)
        if (currentChat) {
            // Get other user's messages to user
            const unsubscribe = onSnapshot(
                query(
                    collection(db, "users", currentChat.uid, 'messages'),
                    where("to", "==", auth.currentUser.uid),
                    ),
                    (otherUserMessagesSnap) => {
                        var otherUserMessages = []
                        otherUserMessagesSnap.forEach((message) => {
                            otherUserMessages.push(message.data())
                        })
                        // Get current user's messages to other user
                        onSnapshot(
                            query(collection(db, "users", auth.currentUser.uid, 'messages'),
                            where("to", "==", currentChat.uid),
                            ),
                            (userMessagesSnap) => {
                            var userMessages = []
                            userMessagesSnap.forEach((message) => {
                                userMessages.push(message.data())
                            })
                            // Combine messages from other user and user
                            const combinedMessages = [...otherUserMessages, ...userMessages]
                            console.log('combinedMessages', combinedMessages)
                            // Sort messages by timestamp
                            const sortedMessages = combinedMessages.sort((a, b) => {
                                return a.data().timestamp - b.data().timestamp
                            })
                            setMessages(sortedMessages)
                        })
                })
                return () => unsubscribe()
            // Get current user's messages to other user

            // Get messages from all users in current user's group (do later)
        } else 
            setMessages([])
    }, [db, currentChat])

  return (
      <>
        <ChatHeader currentChat={currentChat} currentGroup={currentGroup} />
        <ChatMessages messages={messages} />
        <ChatInput />
      </>
  )
}

export default ChatColumn