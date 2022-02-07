import { createContext, useReducer } from "react"
import UserReducer, {
	setCurrentUser,
	setLoading,
	setModal,
} from "./userReducer"
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
import { getAuth, onAuthStateChanged } from "firebase/auth"

const UserContext = createContext()
export const UserProvider = ({ children }) => {
	const initialState = {
		currentUser: {
			id: "",
			username: "",
			profile_picture: "",
			email: "",
			following: [],
			followers: [],
		},
		loading: true,
		modalState: false,
	}
	// const initialState = null
	const [state, dispatch] = useReducer(UserReducer, initialState)

	const loginWithAuth = () => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("user logged in", user)
				loginUser(auth)
			} else {
				dispatch(setCurrentUser(initialState))
			}
		})
	}

	// On page load, queries db for user obj based on currentlyLoggedInUser and sets profilePicture to state
	const loginUser = (auth) => {
		dispatch(setLoading(true))
		try {
			onSnapshot(
				query(
					collection(db, "users"),
					where("email", "==", auth.currentUser.email),
					limit(1)
				),
				(snapshot) => {
					const docSnap = snapshot.docs[0]
					dispatch(
						setCurrentUser({
							id: auth.currentUser.uid,
							username: docSnap.data().username,
							profilePicture: docSnap.data().profile_picture,
							email: docSnap.data().email,
							following: docSnap.data().following,
							followers: docSnap.data().followers,
						})
					)
				}
			)
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))
	}

	const setModalState = (modalState) => {
		dispatch(setModal(modalState))
	}

	return (
		<UserContext.Provider
			value={{
				...state,
				dispatch,
				loginUser,
				loginWithAuth,
				setModalState,
			}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
