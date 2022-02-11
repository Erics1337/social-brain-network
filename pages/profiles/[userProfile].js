import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/userContext';
import { auth, db } from '../../firebase';
import { onSnapshot, query, collection, where, getDocs, doc, limit } from '@firebase/firestore';

function userProfile({userSlug, userData}) {
    const { checkLoggedIn, currentUser } = useContext(UserContext)
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        if (auth)
            checkLoggedIn()
    }, [])

    useEffect(() => {
        console.log(currentUser);
        const unsubscribe = onSnapshot(
            query(
                collection(db, "users"),
                where("username", '==', userSlug),
                limit(1)
            ),
            (userSnapshot) => {
                if (userSnapshot.empty) {
                    console.log("No matching documents.")
                    return;
                }
                setUser(userSnapshot.docs[0].data())
                getDocs(query(collection(db, "posts"), where('uid', '==', userSnapshot.docs[0].data().uid )))
                .then((postsSnap) => {
                    setUserPosts([])
                    postsSnap.forEach((postSnap) => {
                    setUserPosts((prevPosts) => [
                        ...prevPosts,
                        {
                            id: postSnap.id,
                            ...postSnap.data(),
                        },
                    ])
                })
                })
            }
        )
        return () => unsubscribe()
    }, [db, userSlug])

    console.log(auth.currentUser)

    if (currentUser.username === userSlug) {
        return <h1>User owns the page</h1>
    }
    else if (userData) {
        return <h1>Other User Profile Page</h1>
    }
    else {
        return <h1>User Not Found</h1>
    }

}


export const getServerSideProps = async (pageContext) => {
	const userSlug = pageContext.query.userProfile

	// If theres no project with slug name, this will 404
	if (!userSlug) {
		return {
			notFound: true,
		}
	}
    return {
        props: {
            userData: {data: 'data'},
            userSlug
        },
    }
}


export default userProfile
