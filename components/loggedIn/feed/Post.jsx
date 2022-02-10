import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from "@firebase/firestore"
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import { db, auth } from "../../../firebase"

function Post({ currentUser, id, username, userImg = null, img, caption }) {
	const [comment, setComment] = useState("")
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState([])
	const [hasLiked, setHasLiked] = useState(false)

	// Get post data
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "posts", id, "comments"),
				orderBy("timestamp", "desc")
			),
			(snapshot) => setComments(snapshot.docs)
		)
		return () => unsubscribe()
	}, [db, id])

	//  Get likes
	useEffect(
		() => {
			const unsubscribe = onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
				setLikes(snapshot.docs)
			)
			return () => unsubscribe()
		},
		[db, id]
	)

	//   Searches likes array in state if user is in there, and if not (findIndex returns -1) setHasLiked to false
	useEffect(
		() =>
			setHasLiked(
				likes.findIndex((like) => like.id === currentUser.id) !== -1
			),
		[likes]
	)

	//   Toggles like
	const likePost = async () => {
		if (hasLiked) {
			await deleteDoc(doc(db, "posts", id, "likes", currentUser.id))
		} else {
			await setDoc(doc(db, "posts", id, "likes", currentUser.id), {
				username: currentUser.username,
			})
		}
	}

	//   Send comment to db
	const sendComment = async (e) => {
		// Disable default action of form submit to page refresh
		e.preventDefault()

		// Create copy of comment from local store and clear state for snappy action
		const commentToSend = comment
		setComment("")

		await addDoc(collection(db, "posts", id, "comments"), {
			comment: commentToSend,
			username: currentUser.username,
			timestamp: serverTimestamp(),
		})
	}

	return (
		<div className='bg-white my-7 border rounded-sm'>
			{/* Header */}
			<div className='flex items-center p-5'>
				<img
					className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
					src={userImg}
					alt=''
				/>
				<p className='flex-1 font-bold'>{username}</p>
				<DotsHorizontalIcon className='h-5' />
			</div>

			{/* img */}
			<img src={img} className='object-cover w-full' alt='' />

			{/* Buttons */}
			<div className='flex justify-between px-4 pt-4'>
				<div className='flex space-x-4'>
					{hasLiked ? (
						<HeartIconFilled
							className='btn text-red-500'
							onClick={likePost}
						/>
					) : (
						<HeartIcon className='btn' onClick={likePost} />
					)}
					<ChatIcon className='btn' />
					<PaperAirplaneIcon className='btn' />
				</div>
				<BookmarkIcon className='btn' />
			</div>

			{/* caption */}
			<p className='p-5 truncate'>
				{likes.length > 0 && (
					<p className='font-bold mb-1'>{likes.length} likes</p>
				)}
				<span className='font-bold mr-1'>{username} </span>
				{caption}
			</p>

			{/* comments */}
			{comments.length > 0 && (
				<div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
					{comments.map((comment) => (
						<div
							key={comment.id}
							className='flex items-center space-x-2 mb-3'>
							<img
								className='h-7 rounded-full'
								src={comment.data().userImage}
								alt=''
							/>
							<p className='text-sm flex-1'>
								<span className='font-bold pr-2'>
									{comment.data().username}
								</span>
								{comment.data().comment}
							</p>
							<Moment
								interval={1000}
								fromNow
								className='pr-5 text-xs'>
								{comment.data().timestamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			)}

			{/* input box */}
			<form className='flex items-center p-4'>
				<EmojiHappyIcon className='h-7' />
				<input
					type='text'
					value={comment}
					// Capture comment in state
					onChange={(e) => setComment(e.target.value)}
					className='border-none flex-1 focus:ring-0 outline-none'
					placeholder='Add a comment...'
				/>
				<button
					// For form submit on enter key
					type='submit'
					// Prevents spamming comments with space
					disabled={!comment.trim()}
					onClick={sendComment}
					className='font-semibold text-blue-400'>
					Post
				</button>
			</form>
		</div>
	)
}

export default Post
