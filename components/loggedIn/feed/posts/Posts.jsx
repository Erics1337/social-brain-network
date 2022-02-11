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
import { db } from "../../../../firebase"
import Post from "./Post"
import UserContext from "../../../../context/userContext"

const outputGroups = (currentGroup) => {
	var groupList = []
	switch (currentGroup) {
		case "all":
			return ["all"]
		case "friends":
			return ["friends"]
		case "family":
			return ["family"]
		case "work":
			return ["work"]
		case "school":
			return ["school"]
		default:
			return ['']
	}
	return groupList
}


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
					where("userId", 'in', [...combineGroupsUsers(currentGroup, currentUser), currentUser.uid]),
					// where('userGroup', '==', outputGroups(currentGroup)),
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
