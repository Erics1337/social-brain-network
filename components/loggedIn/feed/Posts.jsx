import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { useEffect, useState, useContext } from "react"
import { db } from "../../../firebase"
import Post from "./Post"
import UserContext from "../../../context/userContext"

function Posts() {
	const { currentUser } = useContext(UserContext)
	const [posts, setPosts] = useState([])

	//     const unsubscribe = onSnapshot(
	//       query(collection(db, "posts"), orderBy("timestamp", "desc")),
	//       (snapshot) => {
	//         setPosts(snapshot.docs)
	//       }
	//     )

	//     // When using useEffect(), can clean up function by passing in value here
	//     // Ensures to never attach more than one real-time listener
	//     return () => {
	//       unsubscribe()
	//     }

	//   Light-weight refactored version
	useEffect(() => {
		onSnapshot(
			query(collection(db, "posts"), orderBy("timestamp", "desc")),
			(snapshot) => {
				setPosts(snapshot.docs)
			}
		)
		return () => unsubscribe()
	}, [db])

	return (
		<div>
			{posts.map((post) => (
				<Post
					currentUser={currentUser}
					key={post.id}
					id={post.id}
					username={post.data().username}
					userImg={post.data().profileImg}
					img={post.data().image}
					caption={post.data().caption}
				/>
			))}
		</div>
	)
}

export default Posts
