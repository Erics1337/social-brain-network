import { Profiler, useEffect, useState, useContext } from "react"
import Story from "./Story"
import { db } from "../../../firebase"
import { onSnapshot, getDoc, doc } from "@firebase/firestore"
import UserContext from "../../../context/userContext"

function Stories() {
	const { currentUser } = useContext(UserContext)
	const [stories, setStories] = useState([])

	// Get user's following w/ snapshot
	useEffect(() => {
		onSnapshot(doc(db, "users", currentUser.email), (snapshot) => {
			if (snapshot.exists()) {
				snapshot.data().following.forEach((friend) => {
					getDoc(doc(db, "users", friend)).then((docSnap) => {
						if (docSnap.exists()) {
							setStories((prevStories) => [
								...prevStories,
								docSnap.data(),
							])
						} else console.log("No friend user with that email!")
					})
				})
			} else console.log("No current user with that email!")
		})
	}, [db, onSnapshot])

	return (
		<div className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll
         scrollbar-thin scrollbar-thumb-black'>
			{stories.map((profile, index) => (
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
