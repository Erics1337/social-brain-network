import { createContext, useReducer } from "react"
import ProfileReducer from "./profileReducer"

const ChatContext = createContext()
export const ChatProvider = ({ children }) => {
	const initialState = {
		currentChat: null
	}
	const [state, dispatch] = useReducer(ProfileReducer, initialState)

    const setPostsView = (payload) => {
        dispatch({ type: "SET_POSTS_VIEW", payload })
    }


	return (
		<ChatContext.Provider
			value={{
				...state,
			}}>
			{children}
		</ChatContext.Provider>
	)
}

export default ChatContext
