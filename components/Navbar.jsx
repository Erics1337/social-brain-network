import Link from "next/link"
import Image from "next/image"
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
	UserIcon,
} from "@heroicons/react/outline"
import Router from "next/router"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useContext, useState, useEffect } from "react"
import UserContext from "../context/userContext"
import UploadPostModal from "./UploadPostModal"
import SearchBox from "./SearchBox";
import ChatContext from "../context/chatContext";

function Navbar() {
	const { setModalState, currentUser,  } = useContext(UserContext)
	const { newMessageCount, getNewMessageCount, currentChat } = useContext(ChatContext)
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	useEffect(() => {
		getNewMessageCount(currentUser)
	}, [currentChat])

	return (
		<>
			<UploadPostModal />
			<nav className='shadow-md border-b bg-white sticky top-0 z-50 dark:bg-gray-800 dark:border-b-gray-900 dark:text-gray-100'>
				<div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
					{/* Left Part */}
					<div className='hidden lg:inline-grid'>
						<div
							onClick={() => Router.push("/")}
							className='relative w-60 cursor-pointer dark:hidden'>
							<Image
								src='/logoText.png'
								layout='fill'
								objectFit='contain'
							/>
						</div>
						<div
							onClick={() => Router.push("/")}
							className='relative w-60 cursor-pointer hidden dark:block'>
							<Image
								src='/logoText-dark.png'
								layout='fill'
								objectFit='contain'
							/>
						</div>
					</div>

					<div
						onClick={() => Router.push("/")}
						className='relative w-10 md:hidden flex-shrink-0 cursor-pointer'>
						<Image
							src='/logo.png'
							layout='fill'
							objectFit='contain'
						/>
					</div>

					{/* Middle Part - Custom search input field */}
					<div className='max-w-xs '>
						<SearchBox />
					</div>

					{/* Right Part */}
					<div className='flex items-center justify-end space-x-4'>
						<MenuIcon className='h-9 md:hidden cursor-pointer' 
							onClick={() => setShowMobileMenu(!showMobileMenu)} />
							
						{auth.currentUser ? (
							<>
								<HeartIcon className='navBtn' 
								onClick={() => Router.push("/activity")}
								/>
								<div
									className='relative navBtn'
									onClick={() => Router.push("/messaging")}>
									<PaperAirplaneIcon className='navBtn rotate-45' />
									{newMessageCount > 0 && (
									<div className='absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse'>
										{newMessageCount}
									</div>
									)}
								</div>
								<PlusCircleIcon
									onClick={() => setModalState(true)}
									className='navBtn'
								/>
								<UserGroupIcon className='navBtn' 
								onClick={() => Router.push("/groups")}/>
								<UserIcon
									onClick={() =>
										Router.push(
											`/profile/${currentUser.username}`
										)
									}
									className='navBtn'
								/>

								{/* <img src={} alt="profile pic" onClick={signOut} className="h-10 w-10 rounded-full cursor-pointer" /> */}
								<button
									onClick={() =>
										signOut(auth).then(() => {
											window.location.reload()
										})
									}
									className='cursor-pointer'>
									Sign Out
								</button>
							</>
						) : (
							<button
								className='inline-block bg-blue-500 px-2 py-1 text-white font-semibold 
						text-sm rounded'
								onClick={() => Router.push("/loggin")}>Log In
							</button>
						)}
					</div>
				</div>
					{showMobileMenu && (
						<div className='md:hidden'>
						{auth.currentUser ? (
							<div className='grid grid-cols-5 p-4 mb-5 text-xs'>
								<div className='col-span-1 btn mx-auto mb-5'>
									<HeartIcon className='mx-auto' 
									onClick={() => Router.push("/activity")}
									/>
									<h1>Activity</h1>
								</div>
								<div className='col-span-1 btn mx-auto mb-5'>
									<PaperAirplaneIcon className='ml-4 rotate-45 mx-auto' 
									onClick={() => Router.push("/messaging")}
									/>
									<h1>Messaging</h1>
								</div>

								<div className='col-span-1 btn mx-auto mb-5'>
									<PlusCircleIcon className='mx-auto' 
									onClick={() => setModalState(true)}
									/>
									<h1>Add Post</h1>
								</div>
								<div className='col-span-1 btn mx-auto mb-5'>
									<UserGroupIcon className='mx-auto' 
									onClick={() => Router.push("/groups")}
									/>
									<h1>Groups</h1>
								</div>
								<div className='col-span-1 btn mx-auto mb-5'>
									<UserIcon className='mx-auto' 
									onClick={() => Router.push(`/profile/${currentUser.username}`)}
									/>
									<h1>Profile</h1>
								</div>
							</div>
						) : (
							<button
								className='inline-block bg-blue-500 px-2 py-1 text-white font-semibold 
						text-sm rounded'
								onClick={() => Router.push("/loggin")}>Log In
							</button>
						)}
						</div>
					)}
			</nav>
		</>
	)
}

export default Navbar
