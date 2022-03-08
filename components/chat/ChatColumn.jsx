import {useContext, useEffect, useState} from 'react'
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatContext from "../../context/chatContext"
import { auth, db } from '../../firebase';
import {
	collection,
	onSnapshot,
	query,
	where,
} from "@firebase/firestore"
import UserContext from '../../context/userContext';


function ChatColumn({currentGroup}) {
    const { currentChat, clearMessageCountFromUser } = useContext(ChatContext)
    const { currentUser } = useContext(UserContext)
    const [messages, setMessages] = useState([])
    
    // Get messages
    useEffect(() => {
        if (currentChat) {
            // Get currentUser's messages to currentChat user
            const unsubscribe = onSnapshot(
                query(
                    collection(db, "users", auth.currentUser.uid, 'messages'),
                    where("to", "==", currentChat.uid),
                    ),
                    (userMessagesSnap) => {
                        var userMessages = []
                        userMessagesSnap.forEach((message) => {
                            userMessages.push(message.data())
                        })
                        // Get other user's messages to user
                        onSnapshot(
                            query(collection(db, "users", currentChat.uid, 'messages'),
                            where("to", "==", auth.currentUser.uid),
                            ),
                            (otherUserMessagesSnap) => {
                            var otherUserMessages = []
                            otherUserMessagesSnap.forEach((message) => {
                                otherUserMessages.push(message.data())
                            })
                            // Combine messages from other user and user
                            const combinedMessages = [...otherUserMessages, ...userMessages]
                            // Sort messages by timestamp
                            const sortedMessages = combinedMessages.sort((a, b) => {
                                return a.timestamp - b.timestamp
                            })
                            setMessages(sortedMessages)
                            clearMessageCountFromUser(currentUser)
                        })
                })
                return () => unsubscribe()

            // Get messages from all users in current user's group (todo later)
        } 
        // else {
        //     // Get user's own messages to their broadcast group
        //     const unsubscribe = onSnapshot(
        //         query(
        //             collection(db, "users", auth.currentUser.uid, 'messages'),
        //             where("to", "==", currentGroup),
        //             ),
        //             (userMessagesSnap) => {
        //                 var userMessages = []
        //                 userMessagesSnap.forEach((message) => {
        //                     userMessages.push(message.data())
        //                 })
        //                 setMessages(userMessages)
        //                 // Search for messages from all users in currentUser's currentGroup that have currentUser in any of their groups
        //         })
        //         return () => unsubscribe()
        // }
    }, [db, currentChat, currentGroup])

  return (
      <>
        <ChatHeader currentChat={currentChat} currentGroup={currentGroup} />
        <ChatMessages messages={messages} />
        <ChatInput />
      </>
  )
}

export default ChatColumn