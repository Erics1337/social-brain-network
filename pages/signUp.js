import React from 'react'
import Image from 'next/image'
import * as Yup from "yup"
import { Formik, Field, Form } from "formik"
import { db, auth } from '../firebase'
import { collection, limit, onSnapshot, query, where, addDoc, setDoc, getDoc, doc } from "@firebase/firestore"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



function signUp() {

// Signup Form Validation Schema
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters long"),
  })


    // randomuser.me API
    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
      }
      

  const handleSignup = async (email, password, username) => {
    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Firebase User Created Successfully', authUser.user.uid)

      // Add user to the users collection with id of email
      await setDoc(doc(db, "users", authUser.user.email),{
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomProfilePicture()
      })


      console.log('Firebase User Added to Database', authUser.user.uid)
    } catch (error) {
        console.log('Error Creating User', error)
    }
  }


    return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
    <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <a className='cursor-pointer' href='/'>
            <Image src="/logoText.png" width="240" height="50" />
        </a>
        <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={values => handleSignup(values.email, values.password, values.username)}
        validationSchema={SignupFormSchema}
        validateOnMount={false}
      >

            <Form className="mt-8 w-64 flex flex-col">
                <Field className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                    type="text" name="username" placeholder="Username" />
                <Field className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                    type="email" name="email" placeholder="Email" />
                <Field className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                    type="password" name="password" placeholder="Password" />
                <button type="submit" className=" text-sm text-center bg-blue-500 text-white py-1 rounded font-medium">
                    Sign Up
                </button>
            </Form>
        </Formik>

        <div className="flex justify-evenly space-x-2 w-64 mt-4">
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        <button className="mt-4 flex">
            {/* <div className="bg-no-repeat facebook-logo mr-1"></div> */}
            {/* <span className="text-xs text-blue-900 font-semibold">Sign Up with Facebook</span> */}
        </button>
        {/* <a className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">Forgot password?</a> */}
    </div>
    <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Already have an account?</span>
        <a className="text-blue-500 text-sm font-semibold"> Log In</a>
    </div>
    <div className="mt-3 text-center">
        <span className="text-xs">Get the app</span>
        <div className="flex mt-3 space-x-2">
            <div className="bg-no-repeat apple-store-logo"></div>
            <div className="bg-no-repeat google-store-logo"></div>
        </div>
    </div>
</div>
    )
}

export default signUp
