import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Post from "./Post"

function Posts() {
  const [posts, setPosts] = useState([])

//   useEffect(() => {
//     // use query to get posts collection ordered by timestamp
//     // snapshot is a real-time listener
//     // returns unsubscribe function
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
//   }, [db])


//   Light-weight refactored version
  useEffect(
      () =>
          onSnapshot(
              query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
              (snapshot) => {
                  setPosts(snapshot.docs)
              }
          ),
      [db]
  )


  return (
    <div>
      {posts.map((post) => (
        <Post
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
