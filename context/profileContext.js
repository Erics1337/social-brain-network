import { createContext, useReducer } from "react"
import ProfileReducer from "./profileReducer"

const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
	const initialState = {
		postsView: "grid",
		modalState: false
	}
	const [state, dispatch] = useReducer(ProfileReducer, initialState)

    const setPostsView = (payload) => {
        dispatch({ type: "SET_POSTS_VIEW", payload })
    }

	const setModalState = (payload) => {
		dispatch({ type: "SET_MODAL_STATE", payload })
	}

	return (
		<ProfileContext.Provider
			value={{
				...state,
                setPostsView,
				setModalState,
			}}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContext
