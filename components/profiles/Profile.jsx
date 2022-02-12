import React from "react"
import Image from "next/image"
import Header from "./Header"
import Features from "./Features"
import ProfilePost from "./ProfilePost"
import { ProfileProvider } from "../../context/profileContext"

function Profile({ userData, userPosts }) {
	console.log(userPosts)
	return (
		<ProfileProvider>
			<div className='lg:w-8/12 lg:mx-auto mb-8'>
				<Header userData={userData} postCount={userPosts.length} />
				<div className='px-px md:px-3'>
					<Features />
					{/* <!-- flexbox grid --> */}
					<div className='flex flex-wrap -mx-px md:-mx-3'>
						{userPosts.map((post) => (
							<ProfilePost
								key={post.postId}
								postId={post.postId}
								image={post.image}
								caption={post.caption}
								timestamp={post.timestamp}
								username={userData.username}
								userImg={userData.profilePic}
							/>
						))}
					</div>
				</div>
			</div>
		</ProfileProvider>
	)
}

export default Profile
