import { useContext } from "react"
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/outline"
import ProfileContext from "../../context/profileContext"

const selectedClass =
	"border-t border-gray-700 -mt-px text-gray-700 dark:border-t-gray-200 dark:text-gray-100"

function Features() {
	const { postsView, setPostsView } = useContext(ProfileContext)

	return (
		<>
			{/* <!-- insta features --> */}
			<ul
				className='flex items-center justify-around md:justify-center space-x-12  
          uppercase tracking-widest font-semibold text-xs text-gray-600
          border-t dark:text-gray-400 dark:border-t-gray-800'>
				<li className={`${postsView == "grid" && selectedClass}`}>
					<div
						className='flex p-3 hover:cursor-pointer hover:text-gray-300'
						onClick={() => {
							setPostsView("grid")
						}}>
						<ViewGridIcon className='w-6 h-6' />
						<span className='inline-block md:inline my-auto pl-2'>
							Grid
						</span>
					</div>
				</li>
				<li className={`${postsView == "feed" && selectedClass}`}>
					<a
						className='flex p-3 hover:cursor-pointer hover:text-gray-300'
						onClick={() => {
							setPostsView("feed")
						}}>
						<ViewListIcon className='w-6 h-6' />
						<span className='inline-block md:inline my-auto pl-2'>
							Feed
						</span>
					</a>
				</li>
				<li className={`${postsView == "videos" && selectedClass}`}>
					<a
						className='flex p-3 hover:cursor-pointer hover:text-gray-300'
						onClick={() => {
							setPostsView("videos")
						}}>
						<ViewGridIcon className='w-6 h-6' />
						<span className='inline-block md:inline my-auto pl-2'>
							Videos
						</span>
					</a>
				</li>
			</ul>
		</>
	)
}

export default Features
