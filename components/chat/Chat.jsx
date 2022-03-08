import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/userContext"
import { db } from "../../firebase"
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
	doc,
} from "@firebase/firestore"
import ChatUser from "./ChatUser"
import ChatColumn from './ChatColumn';
import ChatContext from "../../context/chatContext";
import ChatSearch from "./ChatSearch";

function Chat() {
	const { currentUser, currentGroup, combineGroupsUsers } = useContext(UserContext)
	const { currentChat, setCurrentChat } = useContext(ChatContext)

	const [users, setUsers] = useState([])

	// Get all users who are in the currentUser's currentGroup
	// And get latest message from them if there is one
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", [
					...combineGroupsUsers(currentGroup, currentUser),
				])
			),
			(usersSnapshot) => {
				// Get messages
				setUsers([])
				usersSnapshot.docs.forEach((userSnap) => {
					getDocs(
						query(
							collection(db, "users", userSnap.data().uid, 'messages'),
							where("to", "==", currentUser.uid),
							orderBy("timestamp", "desc"),
							limit(1)
							)
							).then((message) => {
						setUsers((prevUsers) => [
							...prevUsers,
							{
								profilePic: userSnap.data().profilePic,
								username: userSnap.data().username,
								latestMessage: {
									timestamp: message.size > 0 ? message.docs[0].data().timestamp : null,
									text: message.size > 0 ? message.docs[0].data().text : null,
								}
							},
						])
					})
				})
			}
		)
		return () => unsubscribe()
	}, [db, currentGroup])

	return (
		<div className='mx-auto mt-5'>
			<div className='min-w-full border rounded sm:grid sm:grid-cols-3'>
				{/* Side Column */}
				<div className='border-r border-gray-300 sm:col-span-1'>
					{/* <ChatSearch /> */}

					{/* Broadcast Button */}
					<div className='mx-3 my-3 grid place-items-center'>
						<div className='relative text-gray-600'>
							<button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
							onClick={()=> setCurrentChat(null)}>
								Broadcast
							</button>
						</div>
					</div>

					{/* Users */}
					<ul className='overflow-auto h-[32rem]'>
						<h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>
							Chats
						</h2>
            {users
			.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((a.username > b.username) ? 1 : -1))
			.map((user, i) => <ChatUser key={i} user={user} />)}
					</ul>
				</div>
				{/* Chat Column */}
				<div className='col-span-2 block'>
					<div className='w-full'>
						<ChatColumn currentGroup={currentGroup} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat
