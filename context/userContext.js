import { createContext, useReducer } from "react"
import UserReducer, {
	setCurrentUser,
	setLoading,
	setModal,
	setGroup,
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
			uid: "",
			username: "",
			profilePic: "",
			email: "",
			following: [],
			followers: [],
		},
		currentGroup: 'all',
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

	// On page load, queries db for user obj based on currentlyLoggedInUser and sets profilePic to state
	const loginUser = (auth) => {
		dispatch(setLoading(true))
		try {
			onSnapshot(
				query(
					collection(db, "users"),
					where("uid", "==", auth.currentUser.uid),
					limit(1)
				),
				(snapshot) => {
					const docSnap = snapshot.docs[0].data()
					dispatch(
						setCurrentUser({
							uid: auth.currentUser.uid,
							username: docSnap.username,
							profilePic: docSnap.profilePic,
							email: docSnap.email,
							following: docSnap.following,
							followers: docSnap.followers,
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

		// Returns a list of all users in the current Group
		const combineGroupsUsers = (currentGroup, currentUser) => {
			switch(currentGroup){
				case "all":
					return [
						...(currentUser.following.acquaintances.length > 0
							? currentUser.following.acquaintances
							: ['']),
						...(currentUser.following.connections.length > 0
							? currentUser.following.connections
							: ['']),
						...(currentUser.following.family.length > 0
							? currentUser.following.family
							: ['']),
						...(currentUser.following.friends.length > 0
							? currentUser.following.friends
							: ['']),
						...(currentUser.following.recognizable.length > 0
							? currentUser.following.recognizable
							: ['']),
					]
				case "acquaintances":
					return [
						...(currentUser.following.acquaintances.length > 0
						? currentUser.following.acquaintances
						: ['']),
					]
				case "connections":
					return [
						...(currentUser.following.connections.length > 0
						? currentUser.following.connections
						: ['']),
					]
				case "family":
					return [
						...(currentUser.following.family.length > 0
						? currentUser.following.family
						: ['']),
					]
				case "friends":
					return [
						...(currentUser.following.friends.length > 0
						? currentUser.following.friends
						: ['']),
					]
				case "recognizable":
					console.log('recognizable');
					return [
						...(currentUser.following.recognizable.length > 0
						? currentUser.following.recognizable
						: ['']),
					]
				default:
					return ['']
			}
		}

	// set currrentGroup
	const setCurrentGroup = (group) => {
		dispatch(setGroup(group))
	}

	return (
		<UserContext.Provider
			value={{
				...state,
				dispatch,
				loginUser,
				loginWithAuth,
				setModalState,
				setCurrentGroup,
				combineGroupsUsers,
			}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
