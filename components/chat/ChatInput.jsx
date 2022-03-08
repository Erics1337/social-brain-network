import { useState, useContext } from "react"
import {
	addDoc,
	doc,
	setDoc,
	collection,
	serverTimestamp,
	updateDoc,
	increment
} from "firebase/firestore"
import { auth, db } from "../../firebase"
import ChatContext from "../../context/chatContext"
import UserContext from "../../context/userContext"

function ChatInput() {
	const [message, setMessage] = useState("")
	const { currentChat } = useContext(ChatContext)
	const { currentGroup } = useContext(UserContext)

	const uploadMessage = async (message) => {
		// Add new message
		const docRef = await addDoc(
			collection(db, "users", auth.currentUser.uid, "messages"),
			{
				to: currentChat ? currentChat.uid : currentGroup,
				from: auth.currentUser.uid,
				text: message,
				timestamp: serverTimestamp(),
				seen: false,
			}
		)
		console.log("New doc added with ID", docRef.id)
	}

	// handle submit message
	const handleSubmit = (e) => {
		e.preventDefault()
		uploadMessage(message)
		setMessage("")
	}

	return (
		<div>
			<form
				className='flex items-center justify-between w-full p-3 border-t border-gray-300'
				onSubmit={(e) => {
					handleSubmit(e)
				}}>
				<input
					type='text'
					placeholder='Message'
					onChange={(e) => setMessage(e.target.value)}
					value={message}
					className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
					name='message'
					required
				/>
				<button type='submit'>
					<svg
						className='w-5 h-5 text-gray-500 origin-center transform rotate-90'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'>
						<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
					</svg>
				</button>
			</form>
		</div>
	)
}

export default ChatInput
