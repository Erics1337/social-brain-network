import { useContext } from "react"
import Moment from "react-moment"
import ChatContext from "../../context/chatContext"

function ChatUser({ user }) {
	const { setCurrentChat } = useContext(ChatContext)
	return (
		<li onClick={() => setCurrentChat(user.username)}>
			<a className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'>
				<img
					className='object-cover w-10 h-10 rounded-full'
					src={user.profilePic}
					alt='username'
				/>
				<div className='w-full pb-2'>
					<div className='flex justify-between'>
						<span className='block ml-2 font-semibold text-gray-600'>
							{user.username}
						</span>
						<Moment
							interval={1000}
							fromNow
							className='pr-5 text-xs'>
							{user.timestamp?.toDate()}
						</Moment>
					</div>
					<span className='block ml-2 text-sm text-gray-600'>
						{user.text}
					</span>
				</div>
			</a>
		</li>
	)
}

export default ChatUser
