import { Dialog, Transition } from "@headlessui/react"
import { useRef, useState, useContext } from "react"
import { CameraIcon } from "@heroicons/react/outline"
import { db, storage } from "../firebase"
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "@firebase/firestore"
import { ref, getDownloadURL, uploadString } from "@firebase/storage"
import UserContext from "../context/userContext"

function UploadPostModal() {
	const { currentUser, modalState, setModalState } = useContext(UserContext)
	const filePickerRef = useRef(null)
	const captionRef = useRef(null)
	const groupRef = useRef(null)
	//  loading variable to lock out upload function
	const [loading, setLoading] = useState(false)
	const [selectedFile, setSelectedFile] = useState(null)

	// Get post id and upload to firebase firestore, get download url and re-attach to original post
	const uploadPost = async () => {
		if (loading) return

		// 1. Create a post and add to firestore 'posts' collection
		const docRef = await addDoc(collection(db, "posts"), {
			group: groupRef.current.value.toLowerCase(),
			uid: currentUser.uid,
			caption: captionRef.current.value,
			likes: [],
			// Use server timezone so we can query based on the same time
			timestamp: serverTimestamp(),
		})

		// 2. Get the post ID for the newly created post
		console.log("New doc added with ID", docRef.id)

		// 3. Upload the image to firebase storage with the post ID
		const imageRef = ref(storage, `posts/${docRef.id}/image`)

		// 4. Get a download URL from firebase storage and update the original post with image
		await uploadString(imageRef, selectedFile, "data_url").then(
			async (snapshot) => {
				// Get download url to reattach to image
				const downloadURL = await getDownloadURL(imageRef)

				// Update original document with new image, now stored in firestore
				await updateDoc(doc(db, "posts", docRef.id), {
					image: downloadURL,
				})
			}
		)

		setModalState(false)
		setLoading(false)
		setSelectedFile(null)
	}

	// Stores a file in state
	const addImageToPost = (e) => {
		//   Initialize a file reader and give it a variable reader
		const reader = new FileReader()
		// Get the file the user selected (its 0 because its one file the user selected)
		if (e.target.files[0]) {
			// Read in data and fire onload function
			reader.readAsDataURL(e.target.files[0])
		}
		// Once browser is done reading in the file, we get the readerEvent object which is the file as an object that can be stored in state
		reader.onload = (readerEvent) => {
			// Store in state
			setSelectedFile(readerEvent.target.result)
		}
	}

	return (
		<Transition.Root show={modalState} appear={true} as='Fragment'>
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
						as='Fragment'
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
						<div
							className='inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
                            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
							<div>
								{/* Photo Upload Input */}
								{selectedFile ? (
									<img
										src={selectedFile}
										className='w-full object-contain cursor-pointer'
										// If click picture after select file, reset picture to null
										onClick={() => setSelectedFile(null)}
										alt='Chosen File'
									/>
								) : (
									<div
										onClick={() =>
											filePickerRef.current.click()
										}
										className='group mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 hover:bg-red-600 cursor-pointer'>
										<CameraIcon
											className='h-6 w-6 text-red-600 group-hover:text-red-100'
											aria-hidden='true'
										/>
									</div>
								)}

								{/* Upload a photo text w/ hidden input for customized file picker */}
								<div className='mt-3 text-center sm:mt-5'>
									<Dialog.Title
										as='h3'
										className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'>
										Upload a photo
									</Dialog.Title>

									<input
										ref={filePickerRef}
										type='file'
										hidden
										// File selection fires this function
										onChange={addImageToPost}
									/>
								</div>

								{/* Caption Input */}
								<div className='mt-2'>
									<input
										className='border-none w-full text-center dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-200'
										type='text'
										// Attach a reference to input field
										ref={captionRef}
										placeholder='Please enter a caption...'
									/>
								</div>

								{/* Choose Group to post to */}
								<div className='pt-2'>
									<label htmlFor='tabs' className='sr-only'>
										Select a group to post to:
									</label>
									<select
										ref={groupRef}
										id='tabs'
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 
										dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 
										dark:focus:border-blue-500 dark:text-gray-100'>
										<option>All</option>
										<option>Loved</option>
										<option>Family</option>
										<option>Friends</option>
										<option>Connections</option>
										<option>Acquaintances</option>
										<option>Recognizable</option>
									</select>
								</div>

								{/* Upload Post Button */}
								<div className='mt-5 sm:mt-6'>
									<button
										type='button'
										// Disable if no selected post
										disabled={!selectedFile}
										onClick={uploadPost}
										className='inline-flex justify-center w-full rounded-md border border-transparent
                                        shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                                        disabled:cursor-not-allowed hidden:disabled:bg-gray-300'>
										{loading
											? "Uploading..."
											: "Upload Post"}
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default UploadPostModal
