import { createContext, useReducer } from 'react';
import UserReducer, { setCurrentUser, setLoading } from "./UserReducer"
import { db, auth } from '../firebase';
import { getDoc, doc } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";


const UserContext = createContext();
export const UserProvider = ({ children }) => {
    
    const initialState = null
    const [state, dispatch] = useReducer(UserReducer, initialState);
    

    const loginWithAuth = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('user logged in', user);
            loginUser(auth)
        } else {
            dispatch(setCurrentUser(initialState))
        }
        });
      }
    

  // On page load, queries db for user obj based on currentlyLoggedInUser and sets profilePicture to state
    const loginUser = (auth) => {
        dispatch(setLoading(true))
        try { 
            getDoc(doc(db, "users", auth.currentUser.email)).then(docSnap => {
                if (docSnap.exists()) {
                    dispatch(setCurrentUser({
                        uid: auth.currentUser.uid,
                        username: docSnap.data().username,
                        profilePicture: docSnap.data().profile_picture,
                    }))
                } else {
                    console.log("No such document!");
                }
            })
            dispatch(setLoading(false))
    } catch (error) {
      console.log(error)
    }
}



  return (
    <UserContext.Provider value={{ ...state, dispatch, loginUser, loginWithAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext