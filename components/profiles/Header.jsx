import Image from "next/image"
import { auth } from "../../firebase"
import FollowButton from "./FollowButton"
import EditableText from "./EditableText"
import { useContext } from "react"
import UserContext from "../../context/userContext"
import UnfollowButton from "./UnfollowButton"
import DeleteButton from "./DeleteButton";

function Header({ userData, postCount }) {
	const { currentUser } = useContext(UserContext)

	// anonymous function to assign value to followers w/gaurd clause to prevent error if no followers
	const followers = (function () {
		if (userData.followers.length) return userData.followers.length
		else return 0
	})()

	// Get number of following
	const following = Object.values(userData?.following)
		.map((element) => element.length)
		.reduce((a, b) => a + b, 0)

	// Check if user whose page it is is being followed by currentUser in any of their groups
	const userIsFollowed = () => {
		if (currentUser.following == undefined) return
		return Object.values(currentUser?.following).some((a) =>
			a.includes(userData.uid)
		)
	}

	const userIsCurrentUser = () => currentUser.uid === userData.uid
	const userIsLoggedIn = () => currentUser.uid != undefined

	return (
		<>
			<header className='flex flex-wrap items-center p-4 md:py-8'>
				<div className='md:w-3/12 md:ml-16'>
					{/* <!-- profile image --> */}
					<Image
						height={150}
						width={150}
						className='w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                   border-2 border-pink-600 p-1'
						alt='profile'
						src={userData.profilePic}
					/>
				</div>

				{/* <!-- profile meta --> */}
				<div className='w-8/12 md:w-7/12 ml-4'>
					<div className='md:flex md:flex-wrap md:items-center mb-4'>
						<h2 className='text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0 pr-5'>
							{userData.username}
						</h2>
						{userIsLoggedIn() &&
							!userIsCurrentUser() ? (
							(!userIsFollowed() ? (
								<FollowButton
									follower={currentUser.uid}
									followee={userData.uid}
								/>
							) : (
									<UnfollowButton
										follower={currentUser.uid}
										followee={userData.uid}
									/>
							)))
						: 
							<DeleteButton currentUser={currentUser} />
							}
					</div>

					{/* <!-- post, following, followers list for medium screens --> */}
					<ul className='hidden md:flex space-x-8 mb-4'>
						<li>
							<span className='font-semibold pr-2'>
								{postCount}
							</span>
							post{postCount != 1 && "s"}
						</li>

						<li>
							<span className='font-semibold pr-2'>
								{followers}
							</span>
							follower{followers != 1 && "s"}
						</li>
						<li>
							<span className='font-semibold pr-2'>
								{following}
							</span>
							following
						</li>
					</ul>
					{/* user meta */}
					<div className='text-sm my-2 md:text-lg md:my-0'>
						<EditableText
							text={userData.subName}
							type={"subName"}
							username={userData.username}
						/>
						<EditableText
							text={userData.bio}
							type={"bio"}
							username={userData.username}
						/>
					</div>
				</div>
			</header>
			{/* <!-- user following for mobile only --> */}
			<ul
				className='flex md:hidden justify-around space-x-8 border-t 
        text-center p-2 text-gray-600 leading-snug text-sm'>
				<li>
					<span className='font-semibold text-gray-800 block'>
						{postCount}
					</span>
					post{postCount != 1 && "s"}
				</li>

				<li>
					<span className='font-semibold text-gray-800 block'>
						{followers}
					</span>
					follower{followers != 1 && "s"}
				</li>
				<li>
					<span className='font-semibold text-gray-800 block'>
						{following}
					</span>
					following
				</li>
			</ul>
		</>
	)
}

export default Header
