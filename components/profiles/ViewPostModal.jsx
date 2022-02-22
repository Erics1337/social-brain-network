import { Dialog, Transition } from "@headlessui/react"
import { useContext } from "react"
import ProfileContext from "../../context/profileContext"
import Post from "../feed/posts/Post"

function ViewPostModal() {
	if (postData === null) return null
	const { modalState, setModalState, postData } = useContext(ProfileContext)

	const { image, caption, postId } = postData.postData
	const { username, profilePic } = postData.userData

	console.log("postData", postData)

	return (
		<Transition.Root open show={modalState} appear={true} as='Fragment'>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				onClose={() => setModalState(false)}>
				<div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as='Fragment'
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

						{/* Trick the browser into centering the modal contents */}
						<span
							className='hidden sm:inline-block sm:align-middle sm:h-screen'
							aria-hidden='true'>
							&#8203
						</span>
					</Transition.Child>

					<Transition.Child
						onClick={() => setModalState(true)}
						as='Fragment'
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
						<div
							className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
                            shadow-xl transform transition-all sm:mt-5 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
							<Post
								userImg={profilePic}
								id={postId}
								username={username}
								image={image}
								caption={caption}
							/>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default ViewPostModal
