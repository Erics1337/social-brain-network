import React from "react"
import ChatInput from "./ChatInput"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
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

function Chat() {
	const {
		loading,
		checkLoggedIn,
		currentUser,
		currentGroup,
		combineGroupsUsers,
	} = useContext(UserContext)
	const [users, setUsers] = useState([])

	// Get all users who are in the currentUser's currentGroup
	// And get latest message from them if there is one
	useEffect(() => {
		console.log("currentGroup", currentGroup)
		console.log(
			"arrayContains",
			combineGroupsUsers(currentGroup, currentUser)
		)
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", [
					...combineGroupsUsers(currentGroup, currentUser),
				])
			),
			(usersSnapshot) => {
				setUsers([])
				usersSnapshot.docs.forEach((userSnap) => {
					console.log("userSnap", userSnap.data())
					getDocs(
						query(
							collection(db, "messages"),
							where("uid", "==", userSnap.data().uid),
							orderBy("timestamp", "desc"),
							limit(1)
						)
					).then((message) => {
						setUsers((prevUsers) => [
							...prevUsers,
							{
								...userSnap.data(),
								latestMessage: message.docs[0]
									? message.docs[0]
									: null,
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
					<div className='mx-3 my-3 grid place-items-center'>
						<div className='relative text-gray-600'>
							<button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
								Broadcast
							</button>
						</div>
					</div>

					{/* Users */}
					<ul className='overflow-auto h-[32rem]'>
						<h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>
							Chats
						</h2>
            {users.sort((a,b) => (a.latestMessage.timestamp > b.latestMessage.timestamp) ? 1 : ((a.username > b.username) ? 1 : -1)).map((user, i) => 
              <ChatUser key={i} user={user} />
            )}
					</ul>
				</div>
				{/* Chat Column */}
				<div className='col-span-2 block'>
					<div className='w-full'>
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
