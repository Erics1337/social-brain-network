import React from "react"
import { db } from "../../firebase"
import {
	collection,
	doc,
	updateDoc,
  arrayRemove
} from "@firebase/firestore"


function UnfollowButton({follower, followee}) {

  const UnfollowUser = async () => {
    console.log('unfollowing user', followee)
    // Remove followee from follower's followers list
    await updateDoc(doc(collection(db, "users"), followee), {
      'followers': arrayRemove(follower),
    })
    // Remove follower from all of followee's groups
    await updateDoc(doc(collection(db, "users"), follower), {
      'following.acquaintances': arrayRemove(followee),
      'following.connections': arrayRemove(followee),
      'following.family': arrayRemove(followee),
      'following.friends': arrayRemove(followee),
      'following.loved': arrayRemove(followee),
      'following.recognizable': arrayRemove(followee),
    })
  }
	return (
		<p
      onClick={() => UnfollowUser()}
			className='bg-gray-500 px-2 py-1 
            text-white font-semibold text-sm rounded block text-center 
            md:inline-block hover:cursor-pointer hover:bg-gray-600'>
			Unfollow
		</p>
	)
}

export default UnfollowButton
