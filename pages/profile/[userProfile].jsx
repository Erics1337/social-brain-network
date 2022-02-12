import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/userContext"
import { auth, db } from "../../firebase"
import {
	onSnapshot,
	query,
	collection,
	where,
	getDocs,
	doc,
	limit,
} from "@firebase/firestore"
import Profile from "../../components/profiles/Profile"
import Navbar from "../../components/Navbar"
import UploadPostModal from "../../components/UploadPostModal"
import Loader from '../../components/Loader';


function userProfile({ userSlug }) {
	const { loading, checkLoggedIn, currentUser } = useContext(UserContext)
	const [userPosts, setUserPosts] = useState([])
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		if (auth) checkLoggedIn()
	}, [])

	useEffect(() => {
		// Get user data and posts from userSlug
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("username", "==", userSlug),
				limit(1)
			),
			(userSnapshot) => {
				if (userSnapshot.empty) {
					console.log("No matching documents.")
				} else {
					// Set user data
					setUserData(userSnapshot.docs[0].data())
					// Get user posts
					getDocs(
						query(
							collection(db, "posts"),
							where("uid", "==", userSnapshot.docs[0].data().uid)
						)
					).then((postsSnap) => {
						setUserPosts([])
						postsSnap.forEach((postSnap) => {
							// Set user posts
							setUserPosts((prevPosts) => [
								...prevPosts,
								{
									postId: postSnap.id,
									...postSnap.data(),
								},
							])
						})
					})
				}
			}
		)
		return () => unsubscribe()
	}, [db, userSlug])

	if (loading) return <Loader />
	if (userData) {
		return (
			<>
				<main className='bg-gray-100 bg-opacity-25 h-screen'>
					<Navbar />
					<Profile userData={userData} userPosts={userPosts} />
					<UploadPostModal />
				</main>
			</>
		)
	} else return <h1>User not found</h1>
}

export const getServerSideProps = async (pageContext) => {
	const userSlug = pageContext.query.userProfile

	// If theres no project with slug name, this will 404
	if (!userSlug) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			userSlug,
		},
	}
}

export default userProfile
