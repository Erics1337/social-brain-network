import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header';
import Modal from '../components/Modal';
import Homepage from '../components/Homepage';
import {useState, useEffect} from 'react'
import { db, auth } from '../firebase';
import { getDoc, doc } from "@firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {
  const [currentUser, setCurrentUser] = useState(null)

  // // By using an observer, you ensure that the Auth object isn't in an intermediate state
  // onAuthStateChanged(auth, (user) => {
  //   user ? setCurrentUser(user) : setCurrentUser(null)
  // })


// On page load, queries db for user obj based on currentlyLoggedInUser and sets profilePicture to state
useEffect(() => {
  try { 
    getDoc(doc(db, "users", auth.currentUser.email)).then(docSnap => {
    if (docSnap.exists()) {
        setCurrentUser({
          uid: auth.currentUser.uid,
          username: docSnap.data().username,
          profilePicture: docSnap.data().profile_picture,
        })
        console.log(currentUser)
    } else {
      console.log("No such document!");
    }
  })
} catch (error) {
  console.log(error)
}
}, [])

  return (
    <div className="bg-grey-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Social Brain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {currentUser ? (
      // <pre>{JSON.stringify(currentUser)}</pre>
      <Feed currentUser={currentUser}/>
      ) : (
        <Homepage  />
    )}

      {/* Feed */}
      <Modal currentUser={currentUser}/>

    </div>
  )
}
