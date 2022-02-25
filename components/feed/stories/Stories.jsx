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
	updateDoc,
	arrayUnion,
} from "@firebase/firestore"
import UserContext from "../../../context/userContext"
import { useDrop } from 'react-dnd'
import { ItemTypes } from "../../../utilities/items";



function Stories({ group=null}) {
	const { currentUser, currentGroup, combineGroupsUsers, groupNumber, setCurrentUser } = useContext(UserContext)
	const [stories, setStories] = useState([])

	// if no group prop passed, component will use userContext's currentGroup
	if (!group) group = currentGroup

	// Switch user from one group to another
	  const moveUser = async (user, fromGroup, toGroup) => {
		var newGroupsArray = currentUser.following
		newGroupsArray[`${fromGroup}`] = currentUser.following[`${fromGroup}`].filter(item => item !== user)
		newGroupsArray[`${toGroup}`] = currentUser.following[`${toGroup}`].concat(user)

		await updateDoc(doc(db, `users/${currentUser.uid}`), {
			'following': newGroupsArray
		})

		setCurrentUser({...currentUser, following: newGroupsArray})
	  }
	
	// Makes this component a drop target
	  const [{ isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.USER,
		drop: (item) => moveUser(item.uid, item.fromGroup, group),
		canDrop: (item) => item.fromGroup !== group,
		collect: (monitor) => ({
			isOver: !!monitor.isOver() && monitor.canDrop(),
		})
	  }))

	// Get user's following from all groups w/ snapshot
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", combineGroupsUsers(group, currentUser)),
				where("uid", "!=", currentUser.uid)
			),
			(snapshot) => {
				setStories(snapshot.docs.map((user) => user.data()))
			}
		)
		return () => unsubscribe()
	}, [db, group, currentUser])

	return (
		<div
			ref={drop}
			className={`border-gray-200 flex space-x-2 p-6 bg-white mt-8 border rounded-sm overflow-x-scroll
         scrollbar-thin scrollbar-thumb-black ${isOver && 'border-red-300 bg-yellow-50'}`}>
			<h3>{stories.length + "/" + groupNumber(group)}</h3>
			{stories.map((profile, index) => (
				<Story
					group={group}
					key={index}
					img={profile.profilePic}
					username={profile.username}
					uid={profile.uid}
				/>
			))}
		</div>
	)
}

export default Stories
