import { useContext } from "react"
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/outline"
import ProfileContext from "../../context/profileContext"

const selectedClass =
	"md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"

function Features() {
	const { postsView, setPostsView } = useContext(ProfileContext)

	return (
		<>
			{/* <!-- insta features --> */}
			<ul
				className='flex items-center justify-around md:justify-center space-x-12  
          uppercase tracking-widest font-semibold text-xs text-gray-600
          border-t'>
				<li className={`${postsView == "grid" && selectedClass}`}>
					<div
						className='flex p-3 hover:cursor-pointer hover:text-gray-500'
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
						className='flex p-3 hover:cursor-pointer hover:text-gray-500'
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
						className='flex p-3 hover:cursor-pointer hover:text-gray-500'
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
