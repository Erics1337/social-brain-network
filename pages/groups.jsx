import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext'
import { auth, db } from '../firebase'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import Head from 'next/head'
import Stories from '../components/feed/stories/Stories'

function groups() {
	const router = useRouter()
	const { loading, checkLoggedIn } = useContext(UserContext)

	useEffect(() => {
		if (auth.currentUser) checkLoggedIn()
		else router.push('/loggin')
	}, [])

	if (loading) return <Loader />
	return (
		<>
			<Head>
				<title>Social Brain Groups</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide dark:bg-gray-700'>
				<Navbar />
				<div className='lg:w-8/12 lg:mx-auto mb-8 text-center dark:text-gray-100'>
					<h1 className={'py-5 font-semibold'}>
						Drag and drop users to edit who belongs to which
						broadcast group
					</h1>
					<h1 className={'pt-5'}>Loved</h1>
					<Stories group={'loved'} />
					<h1 className={'pt-5'}>Family</h1>
					<Stories group={'family'} />
					<h1 className={'pt-5'}>Friends</h1>
					<Stories group={'friends'} />
					<h1 className={'pt-5'}>Connections</h1>
					<Stories group={'connections'} />
					<h1 className={'pt-5'}>Acquaintances</h1>
					<Stories group={'acquaintances'} />
					<h1 className={'pt-5'}>Recognizable</h1>
					<Stories group={'recognizable'} />
				</div>
			</main>
		</>
	)
}

export default groups
