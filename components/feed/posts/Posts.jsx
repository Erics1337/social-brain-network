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
	doc
} from "@firebase/firestore"
import { useEffect, useState, useContext } from "react"
import { db } from "../../../firebase"
import Post from "./Post"
import UserContext from "../../../context/userContext"


function Posts() {
	const { currentUser, currentGroup, combineGroupsUsers } = useContext(UserContext)
	const [posts, setPosts] = useState([])
	
	// Here we need to get all the posts where username is in currentUser.following and
	// attach the associated post's username's profilePic to the post object
	useEffect(() => {
			console.log('currentGroup', currentGroup);
			console.log('arrayContains', combineGroupsUsers(currentGroup, currentUser));
			const unsubscribe = onSnapshot(
				query(
					collection(db, "posts"),
					where("uid", 'in', [...combineGroupsUsers(currentGroup, currentUser), currentUser.uid]),
					orderBy("timestamp", "desc")
				),
				(postsSnapshot) => {
					setPosts([])
						postsSnapshot.docs.forEach((postSnap) => {
							getDoc(doc(db, "users", postSnap.data().uid))
							.then((userSnap) => {
								setPosts((prevPosts) => [
									...prevPosts,
									{
										id: postSnap.id,
										...postSnap.data(),
										username: userSnap.data().username,
										userImg: userSnap.data().profilePic,
									},
								])
							})
						})
				}
			)
			return () => unsubscribe()
	}, [db, currentGroup])

	return (
		<div>
			{posts.map((post) => (
				<Post
					currentUser={currentUser}
					key={post.id}
					id={post.id}
					username={post.username}
					userImg={post.userImg}
					image={post.image}
					caption={post.caption}
				/>
			))}
		</div>
	)
}

export default Posts
