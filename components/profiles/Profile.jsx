import React from "react"
import Image from "next/image"
import Header from "./Header"
import Features from "./Features"
import Post from "./Post"
import { ProfileProvider } from "../../context/profileContext"

function Profile({ userData, userPosts }) {
	console.log(userPosts)
	return (
		<ProfileProvider>
			<div className='lg:w-8/12 lg:mx-auto mb-8'>
				<Header userData={userData} />
				<div className='px-px md:px-3'>
					<Features />
					{/* <!-- flexbox grid --> */}
					<div className='flex flex-wrap -mx-px md:-mx-3'>
						{userPosts.map((post) => (
							<Post
								key={post.id}
								postId={post.postId}
								image={post.image}
								comments={post.comments}
								likes={post.likes}
								timestamp={post.timestamp}
							/>
						))}
					</div>
				</div>
			</div>
		</ProfileProvider>
	)
}

export default Profile
