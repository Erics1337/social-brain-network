import { useContext, useEffect, useState } from "react"
import UserContext from "../context/userContext"
import { auth, db } from "../firebase"
import {
	onSnapshot,
	query,
	collection,
	where,
	getDocs,
	doc,
	limit,
} from "@firebase/firestore"
import Profile from "../components/profiles/Profile"
import Navbar from "../components/Navbar"
import UploadPostModal from "../components/UploadPostModal"
import { useRouter } from "next/router";
import Loader from '../components/Loader';


function messaging() {
    const router = useRouter()
    const { loading, checkLoggedIn, currentUser } = useContext(UserContext)


    useEffect(() => {
		if (auth) checkLoggedIn()
        else router.push('/login')
	}, [])

    if (loading) return <Loader />
  return (
    <>
        <Navbar />

    </>
  )
}

export default messaging