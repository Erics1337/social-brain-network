import { createContext, useReducer } from "react"
import ChatReducer from "./chatReducer"

const ChatContext = createContext()
export const ChatProvider = ({ children }) => {
	const initialState = {
		currentChat: null
	}
	const [state, dispatch] = useReducer(ChatReducer, initialState)

    const setCurrentChat = (payload=null) => {
        dispatch({ type: "SET_CURRENT_CHAT", payload })
    }


	return (
		<ChatContext.Provider
			value={{
				...state,
				setCurrentChat,
			}}>
			{children}
		</ChatContext.Provider>
	)
}

export default ChatContext
