import { useContext, useEffect, useState } from "react"
import UserContext from "../context/userContext"
import { auth, db } from "../firebase"
import Navbar from "../components/Navbar"
import { useRouter } from "next/router"
import Loader from "../components/Loader"
import Head from "next/head"

function groups() {
	const router = useRouter()
	const {
		loading,
		checkLoggedIn,
	} = useContext(UserContext)

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
			<main className='bg-grey-50 h-screen overflow-y-scroll scrollbar-hide'>
				<Navbar />
				<div className='lg:w-8/12 lg:mx-auto mb-8'>
					<h1>Groups page is under construction</h1>
				</div>
			</main>
		</>
	)
}

export default groups
