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
	orderBy,
} from "@firebase/firestore"
import Profile from "../../components/profiles/Profile"
import Navbar from "../../components/Navbar"
import Loader from '../../components/Loader';
import Head from "next/head";


function userProfile({ userSlug }) {
	const { loading, checkLoggedIn, currentUser, dispatch, setLoading } = useContext(UserContext)
	const [userPosts, setUserPosts] = useState([])
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		if (auth) checkLoggedIn()
	}, [])

	useEffect(() => {
		dispatch(setLoading(true))
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
							where("uid", "==", userSnapshot.docs[0].data().uid),
							orderBy("timestamp", "desc")
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
		dispatch(setLoading(false))
		return () => unsubscribe()
	}, [db, userSlug])

	if (loading) return <Loader />
	if (!userData) return <h1>User not found</h1>
	else return (
			<>
				<main className='bg-gray-100 bg-opacity-25 min-h-screen dark:bg-gray-700'>
				<Head>
					<title>{userSlug}'s Profile | Social Brain Network</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
					<Navbar />
					<Profile userData={userData} userPosts={userPosts} />
				</main>
			</>
		)
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
