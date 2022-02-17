import { Profiler, useEffect, useState, useContext } from "react"
import Story from "./Story"
import { db } from "../../../firebase"
import {
	onSnapshot,
	getDoc,
	doc,
	query,
	collection,
	where,
} from "@firebase/firestore"
import UserContext from "../../../context/userContext"

function Stories() {
	const { currentUser, currentGroup, combineGroupsUsers, groupNumber } = useContext(UserContext)
	const [stories, setStories] = useState([])


	// Get user's following from all groups w/ snapshot
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", combineGroupsUsers(currentGroup, currentUser)),
				where("uid", "!=", currentUser.uid)
			),
			(snapshot) => {
				setStories(snapshot.docs.map((user) => user.data()))
			}
		)
		return () => unsubscribe()
	}, [db, currentGroup])

	return (
		<div
			className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll
         scrollbar-thin scrollbar-thumb-black'>
			<h3>{stories.length + "/" + groupNumber(currentGroup)}</h3>
			{stories.map((profile, index) => (
				<Story
					key={index}
					img={profile.profilePic}
					username={profile.username}
				/>
			))}
		</div>
	)
}

export default Stories
