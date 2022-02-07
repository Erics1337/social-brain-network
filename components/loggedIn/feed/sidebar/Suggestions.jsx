import { useEffect, useState, useContext } from "react"
import { auth, db } from "../../../../firebase"
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
import UserContext from "../../../../context/userContext"

function Suggestions() {
	const { currentUser } = useContext(UserContext)

	const initialSuggestionCount = 1
	const allSuggestionCount = 5
	const [suggestions, setSuggestions] = useState([])
	const [suggestionCount, setSuggestionCount] = useState(
		initialSuggestionCount
	)

	useEffect(
		() => {
		const unsubscribe = onSnapshot(
				query(
					collection(db, "users"),
					limit(suggestionCount),
					where("email", "not-in", [
						...currentUser.following,
						currentUser.email,
					])
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
		},
		[db, suggestionCount, suggestions]
	)

	const followUser = async (email) => {
		await updateDoc(doc(collection(db, "users"), email),{
			followers: arrayUnion(
				currentUser.email
			)})
		
		await updateDoc(doc(collection(db, "users"), currentUser.email),{
			following: arrayUnion(email)
		}
		)
		// Update State with new following here -or- figure out firestore onSnapshot live updates
	}

	return (
		<div className='mt-4 ml-10'>
			<div className='flex justify-between text-sm mb-5'>
				<h3 className='text-sm font-bold text-gray-400'>
					Suggestions for you
				</h3>
				{suggestionCount == initialSuggestionCount ? (
					<button
						onClick={() => setSuggestionCount(allSuggestionCount)}
						className='text-gray-600 font-semibold'>
						See All
					</button>
				) : (
					<button
						onClick={() =>
							setSuggestionCount(initialSuggestionCount)
						}
						className='text-gray-600 font-semibold'>
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
						className='w-10 h-10 rounded-full border p-[2px]'
						src={profile.profile_picture}
						alt=''
					/>
					<div className='flex-1 ml-4'>
						<h2 className='font-semibold text-sm'>
							{profile.username}
						</h2>
						<h3 className='text-xs text-gray-400'>
							Has {profile.following.length} Friend
							{profile.following.length > 1 && "s"}
						</h3>
					</div>
					<button
						onClick={() => followUser(profile.email)}
						className='text-blue-400'>
						Follow
					</button>
				</div>
			))}
		</div>
	)
}

export default Suggestions
