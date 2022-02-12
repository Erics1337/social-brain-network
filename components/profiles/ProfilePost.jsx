import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import Image from "next/image";
import {
	ChatIcon,
	HeartIcon
} from "@heroicons/react/outline"
import { db } from "../../firebase";
import { onSnapshot, collection, query, orderBy, getDoc, doc } from '@firebase/firestore';
import ProfileContext from "../../context/profileContext"
import ViewPostModal from "./ViewPostModal";


function ProfilePost({ postId, username, image, caption, userImg, timestamp }) {
	const { setModalState } = useContext(ProfileContext)
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState([])
	
	//  Get likes
	useEffect(
		() => {
			const unsubscribe = onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) =>
				setLikes(snapshot.docs)
			)
			return () => unsubscribe()
		},
		[db]
	)

	// Get comments and combine user data
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "posts", postId, "comments"),
				orderBy("timestamp", "desc")
			),
			// set Profile Pic and username from userId for each comment
			(snapshot) => snapshot.forEach((comment) => {
				getDoc(doc(db, "users", comment.data().uid))
				.then((docSnap) => {
					setComments((prevComments) => [
						...prevComments,
						{
							id: comment.id,
							comment: comment.data().comment,
							timestamp: comment.data().timestamp,
							username: docSnap.data().username,
							userImg: docSnap.data().profilePic,
							
						},
					])
				})
			})
		)
		return () => unsubscribe()
	}, [db])

	return (
		<>
			<ViewPostModal postId={postId} username={username} userImg={userImg} image={image} caption={caption} />
			{/* <!-- column --> */}
			<div className='w-1/3 p-px md:px-3' onClick={() => setModalState(true)}>
				<article className='post bg-gray-100 text-white relative pb-full md:mb-6 hover:cursor-pointer'>
					{/* <!-- post image--> */}
					<Image
						layout='fill'
						className='w-full h-full absolute left-0 top-0 object-cover'
						src={image}
						alt='image'
					/>
					<i className='fas fa-square absolute right-0 top-0 m-1'></i>
					{/* <!-- overlay--> */}
					<div
						className='overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
							left-0 top-0 hidden'>
						<div
							className='flex justify-center items-center 
								space-x-4 h-full'>
							<span className='p-2'>
								<HeartIcon className={'inline-block h-6 pr-2 pb-1'} />
								{likes.length}
							</span>

							<span className='p-2'>
								<ChatIcon className={'inline-block h-6 pr-2 pb-1'} />
								{comments.length}
							</span>
						</div>
					</div>
				</article>
			</div>
		</>
	)
}

export default ProfilePost
