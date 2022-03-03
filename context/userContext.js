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
	const groups = {
		loved: [],
		family: [],
		friends: [],
		connections: [],
		acquaintances: [],
		recognizable: [],
	}

	const initialState = {
		currentUser: {
			uid: "",
			username: "",
			profilePic: "",
			email: "",
			following: groups,
			followers: groups,
		},
		currentGroup: "all",
		loading: true,
		modalState: false,
	}
	// const initialState = null
	const [state, dispatch] = useReducer(UserReducer, initialState)

	const checkLoggedIn = () => {
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
		if (!auth.currentUser) return
		dispatch(setLoading(true))
			onSnapshot(
				doc(
					collection(db, "users"), auth.currentUser.uid
				),
				(docSnap) => {
					if (!docSnap.exists || !docSnap.data() || !auth.currentUser) return
					dispatch(
						setCurrentUser({
							uid: auth.currentUser.uid,
							username: docSnap.data().username,
							profilePic: docSnap.data().profilePic,
							email: docSnap.data().email,
							following: docSnap.data().following,
							followers: docSnap.data().followers,
						})
					)

				}
			)
		dispatch(setLoading(false))
	}

	const setModalState = (modalState) => {
		dispatch(setModal(modalState))
	}

	const groupNumber = (currentGroup) => {
		switch (currentGroup) {
			case "loved":
				return 7
			case "family":
				return 15
			case "friends":
				return 50
			case "connections":
				return 150
			case "acquaintances":
				return 500
			case "recognizable":
				return 1500
			case "all":
				return 2222
			default:
				return 0
		}
	}

	// Returns a list of all users in the current Group
	const combineGroupsUsers = (currentGroup, currentUser) => {
		switch (currentGroup) {
			case "all":
				return [
					...(currentUser.following.acquaintances.length > 0
						? currentUser.following.acquaintances
						: [""]),
					...(currentUser.following.connections.length > 0
						? currentUser.following.connections
						: [""]),
					...(currentUser.following.family.length > 0
						? currentUser.following.family
						: [""]),
					...(currentUser.following.friends.length > 0
						? currentUser.following.friends
						: [""]),
					...(currentUser.following.recognizable.length > 0
						? currentUser.following.recognizable
						: [""]),
				]
			case "loved":
				return [
					...(currentUser.following.loved.length > 0
						? currentUser.following.loved
						: [""]),
				]
			case "acquaintances":
				return [
					...(currentUser.following.acquaintances.length > 0
						? currentUser.following.acquaintances
						: [""]),
				]
			case "connections":
				return [
					...(currentUser.following.connections.length > 0
						? currentUser.following.connections
						: [""]),
				]
			case "family":
				return [
					...(currentUser.following.family.length > 0
						? currentUser.following.family
						: [""]),
				]
			case "friends":
				return [
					...(currentUser.following.friends.length > 0
						? currentUser.following.friends
						: [""]),
				]
			case "recognizable":
				return [
					...(currentUser.following.recognizable.length > 0
						? currentUser.following.recognizable
						: [""]),
				]
			default:
				return [""]
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
				checkLoggedIn,
				setModalState,
				setCurrentGroup,
				combineGroupsUsers,
				groupNumber,
				setCurrentUser
			}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
