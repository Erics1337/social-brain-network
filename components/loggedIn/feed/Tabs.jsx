import { useContext } from "react"
import UserContext from "../../../context/userContext"

function Tabs() {
	const { currentGroup, setCurrentGroup } = useContext(UserContext)

	return (
		<div className='pt-5'>
			<div className='sm:hidden'>
				<label htmlFor='tabs' className='sr-only'>
					Select Your Social Group
				</label>
				<select
					id='tabs'
					className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
					<option>All</option>
					<option>Family</option>
					<option>Friends</option>
					<option>Connections</option>
					<option>Acquaintances</option>
					<option>Recognizable</option>
				</select>
			</div>
			<ul className='flex rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700'>
				<li className='w-full'>
					<button
						onClick={() => setCurrentGroup("all")}
						className={`${
							currentGroup === "all"
								? "bg-gray-200 text-gray-900 hover:bg-gray-300"
								: "text-gray-500"
						} rounded-l-lg inline-block relative py-4 px-4 w-full text-sm font-medium text-center hover:text-gray-700 hover:bg-gray-50 text-gray-900 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white`}
						aria-current='page'>
						All
					</button>
				</li>
				<li className='w-full'>
					<button
						onClick={() => setCurrentGroup("family")}
						className={`${
							currentGroup === "family"
								? "bg-gray-200 text-gray-900 hover:bg-gray-300"
								: "text-gray-500"
						} inline-block relative py-4 px-4 w-full text-sm font-medium text-center hover:text-gray-700 hover:bg-gray-50 text-gray-900 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white`}>
						Family
					</button>
				</li>
				<li className='w-full'>
					<button
						onClick={() => setCurrentGroup("friends")}
						className={`${
							currentGroup === "friends"
								? "bg-gray-200 text-gray-900 hover:bg-gray-300"
								: "text-gray-500"
						} inline-block relative py-4 px-4 w-full text-sm font-medium text-center hover:text-gray-700 hover:bg-gray-50 text-gray-900 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white`}>
						Friends
					</button>
				</li>
				<li className='w-full'>
					<button
						onClick={() => setCurrentGroup("connections")}
						className={`${
							currentGroup === "connections"
								? "bg-gray-200 text-gray-900 hover:bg-gray-300"
								: "text-gray-500"
						} inline-block relative py-4 px-4 w-full text-sm font-medium text-center hover:text-gray-700 hover:bg-gray-50 text-gray-900 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white`}>
						Connections
					</button>
				</li>
				<li className='w-full'>
					<button
						onClick={() => setCurrentGroup("acquaintances")}
						className={`${
							currentGroup === "acquaintances"
								? "bg-gray-200 text-gray-900 hover:bg-gray-300"
								: "text-gray-500"
						} inline-block relative py-4 px-4 w-full text-sm font-medium text-center hover:text-gray-700 hover:bg-gray-50 text-gray-900 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white`}>
						Acquaintances
					</button>
				</li>
				<li className='w-full'>
					<button
						onClick={() => setCurrentGroup("recognizable")}
						className={`${
							currentGroup === "recognizable"
								? "bg-gray-200 text-gray-900 hover:bg-gray-300"
								: "text-gray-500"
						} rounded-r-lg inline-block relative py-4 px-4 w-full text-sm font-medium text-center hover:text-gray-700 hover:bg-gray-50 text-gray-900 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white`}>
						Recognizable
					</button>
				</li>
			</ul>
		</div>
	)
}
export default Tabs
