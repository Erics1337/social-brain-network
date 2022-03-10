import { useContext, useEffect, useState } from "react"
import UserContext from "../context/userContext"
import { auth, db } from "../firebase"

import Navbar from "../components/Navbar"
import { useRouter } from "next/router"
import Loader from "../components/Loader"
import Head from "next/head"

function activity() {
	const router = useRouter()
	const {
		loading,
		checkLoggedIn,
	} = useContext(UserContext)

	useEffect(() => {
		if (auth.currentUser) checkLoggedIn()
		else router.push("/loggin")
	}, [])

	if (loading) return <Loader />
	return (
		<>
			<Head>
				<title>Social Brain Messaging</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='bg-grey-50 h-screen overflow-y-scroll scrollbar-hide dark:bg-gray-700'>
				<Navbar />
				<div className='lg:w-8/12 lg:mx-auto mb-8'>
					<h1>Activity page is under construction</h1>
				</div>
			</main>
		</>
	)
}

export default activity
