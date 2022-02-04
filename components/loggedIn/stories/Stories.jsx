import { Profiler, useEffect, useState, useContext } from "react"
import Story from "./Story"
import { db } from "../../../firebase"
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	getDoc,
	doc,
} from "@firebase/firestore"
import UserContext from "../../../context/userContext"

function Stories() {
	const { currentUser } = useContext(UserContext)
	const [suggestions, setSuggestions] = useState([])

    // Get user's friends w/ snapshot
	useEffect(() => {
		onSnapshot(doc(db, "users", currentUser.email), (snapshot) => {
			if (snapshot.exists()) {
				snapshot.data().friends.forEach((friend) => {
					getDoc(doc(db, "users", friend)).then((docSnap) => {
						if (docSnap.exists()) {
							setSuggestions((prevSuggestions) => [
								...prevSuggestions,
								docSnap.data(),
							])
						} else console.log("No friend user with that email!")
					})
				})
			} else console.log("No current user with that email!")
		})
	}, [db, onSnapshot])

	return (
		<div
			className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll
         scrollbar-thin scrollbar-thumb-black'>
			{/* <Story img={session.user.image} username={auth.user.username} /> */}

			{suggestions.map((profile, index) => (
				<Story
					key={index}
					img={profile.profile_picture}
					username={profile.username}
				/>
			))}
		</div>
	)
}

export default Stories
