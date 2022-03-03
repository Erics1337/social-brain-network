import Router from 'next/router';
import React from 'react'
import { auth } from '../../firebase';

function DeleteButton({currentUser}) {

const deleteUserAccount = () => {
    auth.currentUser.delete().then(function() {
      console.log('User account deleted.');
    }).catch(function(error) {
        console.log('Error deleting user:', error);
    });
    Router.push('/')
};

  return (
    <h1 onClick={() => deleteUserAccount()}
        className='bg-red-500 px-2 py-1 
        text-white font-semibold text-sm rounded block text-center 
        md:inline-block hover:cursor-pointer hover:bg-red-600'>
            Delete account</h1>
  )
}

export default DeleteButton