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
} from "@firebase/firestore"
import { useEffect, useState, useContext } from "react"
import { db } from "../../../firebase"
import Post from "./Post"
import UserContext from "../../../context/userContext"

function Posts({ currentGroup }) {
	const { currentUser, combineGroups } = useContext(UserContext)
	const [posts, setPosts] = useState([])
	
	// Here we need to get all the posts where username is in currentUser.following and
	// attach the associated post's username's profilePic to the post object


	
	useEffect(() => {
			console.log('currentGroup', currentGroup);
			console.log('arrayContains', combineGroups(currentGroup, currentUser));
			const unsubscribe = onSnapshot(
				query(
					collection(db, "posts"),
					where("userId", 'in', combineGroups(currentGroup, currentUser)),
					orderBy("timestamp", "desc")
				),
				(snapshot) => {
					setPosts([])
						snapshot.docs.map((doc) => {
							getDocs(
								query(
									collection(db, "users"),
									where(
										"uid",
										"==",
										doc.data().userId
									),
									limit(1)
								)
								).then((snapshot) => {
								setPosts((prevPosts) => [
									...prevPosts,
									{
										id: doc.id,
										...doc.data(),
										username: snapshot.docs[0].data().username,
										userImg: snapshot.docs[0].data().profilePic,
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
					img={post.image}
					caption={post.caption}
				/>
			))}
		</div>
	)
}

export default Posts
