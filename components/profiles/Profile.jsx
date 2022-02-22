import React from "react"
import Image from "next/image"
import Header from "./Header"
import Features from "./Features"
import ProfilePost from "./ProfilePost"
import { ProfileProvider } from "../../context/profileContext"
import ViewPostModal from "./ViewPostModal"

function Profile({ userData, userPosts }) {
	return (
		<ProfileProvider>
			<ViewPostModal />
			<div className='lg:w-8/12 lg:mx-auto mb-8'>
				<Header userData={userData} postCount={userPosts.length} />
				<div className='px-px md:px-3'>
					<Features />
					{/* <!-- flexbox grid --> */}
					<div className='flex flex-wrap -mx-px md:-mx-3'>
						{userPosts.map((post) => (
							<ProfilePost
								key={post.postId}
								postData={post}
								userData={userData}
							/>
						))}
					</div>
				</div>
			</div>
		</ProfileProvider>
	)
}

export default Profile
