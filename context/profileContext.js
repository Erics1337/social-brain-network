import { createContext, useReducer } from "react"
import ProfileReducer from "./profileReducer"
import { db, auth } from "../firebase"
import {
	getDoc,
	doc,
	onSnapshot,
	query,
	collection,
	where,
	limit,
} from "@firebase/firestore"

const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
	const initialState = {
		postsView: "grid",
	}
	const [state, dispatch] = useReducer(ProfileReducer, initialState)

    const setPostsView = (payload) => {
        dispatch({ type: "SET_POSTS_VIEW", payload })
    }

	return (
		<ProfileContext.Provider
			value={{
				...state,
                initialState,
				dispatch,
                setPostsView,
			}}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContext
