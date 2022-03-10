import { useEffect, useState, useContext } from "react"
import { auth, db } from "../../firebase"
import {
	collection,
	onSnapshot,
	query,
	limit,
	where,
	doc,
	arrayUnion,
	updateDoc,
} from "@firebase/firestore"
import UserContext from "../../context/userContext"
import Router from "next/router";

function Suggestions() {
	const { currentUser } = useContext(UserContext)

	const initialSuggestionCount = 1
	const allSuggestionCount = 5
	const [suggestions, setSuggestions] = useState([])
	const [reload, setReload] = useState(true)
	const [suggestionCount, setSuggestionCount] = useState(
		initialSuggestionCount
	)

	const totalFriends = (profile) => {
		let count = 0
		Object.keys(profile.following).forEach((key) => {
			count += profile.following[key].length
		})
		return count
	}

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				limit(suggestionCount),
				where("uid", "not-in", [ 
					...Object.values(currentUser.following).flat(),
					currentUser.uid,
				 ]),
			),
			(snapshot) => {
				setSuggestions([])
				snapshot.docs.forEach((user) => {
					setSuggestions((prevSuggestions) => [
						...prevSuggestions,
						user.data(),
					])
				})
			}
		)
		return () => unsubscribe()
	}, [db, suggestionCount, reload])

	const followUser = async (uid) => {
		await updateDoc(doc(collection(db, "users"), uid), {
			'followers': arrayUnion(currentUser.uid),
		})

		await updateDoc(doc(collection(db, "users"), currentUser.uid), {
			'following.recognizable': arrayUnion(uid)
		})
		// currentUser following list state updated by live listener, just need to reload suggestions component to re-query
		setReload(!reload)
		// setSuggestionCount(suggestionCount)
	}

	return (
		<div className='mt-4 ml-10'>
			<div className='flex justify-between text-sm mb-5'>
				<h3 className='text-sm font-bold text-gray-400 dark:text-gray-100'>
					Suggestions for you
				</h3>
				{suggestionCount == initialSuggestionCount ? (
					<button
						onClick={() => setSuggestionCount(allSuggestionCount)}
						className='text-gray-600 dark:text-gray-300 font-semibold'>
						See All
					</button>
				) : (
					<button
						onClick={() =>
							setSuggestionCount(initialSuggestionCount)
						}
						className='text-gray-600 dark:text-gray-300 font-semibold'>
						See Less
					</button>
				)}
			</div>
			{/* {JSON.stringify(suggestions)} */}
			{suggestions.map((profile, index) => (
				<div
					key={index}
					className='flex items-center justify-between mt-3'>
					<img
						className='w-10 h-10 rounded-full border p-[2px] hover:cursor-pointer'
						src={profile.profilePic}
						alt='user profile pic'
						onClick={()=> Router.push(`/profile/${profile.username}`)}
					/>
					<div className='flex-1 ml-4'>
						<h2 className='font-semibold text-sm hover:cursor-pointer hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300'
						onClick={()=> Router.push(`/profile/${profileusername}`)}
						>
							{profile.username}
						</h2>
						<h3 className='text-xs text-gray-400'>
							Has {totalFriends(profile)} Friend
							{totalFriends(profile) != 1 && "s"}
						</h3>
					</div>
					<button
						onClick={() => followUser(profile.uid)}
						className='text-blue-400'>
						Follow
					</button>
				</div>
			))}
		</div>
	)
}

export default Suggestions
