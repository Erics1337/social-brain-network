import { useContext, useEffect, useState } from "react"
import UserContext from "../context/userContext"
import { auth, db } from "../firebase"
import {
	onSnapshot,
	query,
	collection,
	where,
	getDocs,
	doc,
	limit,
} from "@firebase/firestore"
import Profile from "../components/profiles/Profile"
import Navbar from "../components/Navbar"
import { useRouter } from "next/router"
import Loader from "../components/Loader"
import Tabs from "../components/feed/Tabs"
import Head from "next/head"
import Chat from "../components/chat/Chat"
import { ChatProvider } from "../context/chatContext"

function messaging() {
	const router = useRouter()
	const { loading, checkLoggedIn, currentUser } = useContext(UserContext)

	useEffect(() => {
		if (auth) checkLoggedIn()
		else router.push("/login")
	}, [])

	if (loading) return <Loader />
	return (
		<>
            <Head>
                <title>Social Brain Messaging</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
			<ChatProvider>
				<main className='bg-grey-50 h-screen overflow-y-scroll scrollbar-hide'>
					<Navbar />
					<div className='lg:w-8/12 lg:mx-auto mb-8'>
						<Tabs />
						<Chat />
					</div>
				</main>
			</ChatProvider>
		</>
	)
}

export default messaging
