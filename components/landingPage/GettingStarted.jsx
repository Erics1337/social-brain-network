import React from 'react'

function GettingStarted() {
	return (
		<section className='bg-white py-8 dark:bg-gradient-to-b dark:from-gray-700 dark:via-purple-700 dark:to-gray-700 dark:text-gray-100'>
			<div className='container mx-auto flex flex-wrap pt-4 pb-12'>
				<h1 className='z-20 w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-gray-100'>
					Getting Started
				</h1>
				{/* <div className='w-full mb-4'>
					<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
				</div> */}
				<div className='w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink'>
					<div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow dark:bg-gray-300'>
						<a
							href='#'
							className='flex flex-wrap no-underline hover:no-underline'>
							<p className='w-full text-gray-600 text-xs md:text-sm px-6 pt-5'>
								Sign up
							</p>
							<div className='w-full font-bold text-xl text-gray-800 px-6'>
								Sign up for an account using your email address and by creating a secure password
							</div>
							<p className='text-gray-800 text-base px-6 mb-5'>
								Try out the software by creating an account for free.  You can delete the account any time after it is created.
							</p>
						</a>
					</div>
					<div className='flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6 dark:bg-gray-200'>
						<div className='flex items-center justify-start'>
							<button className='mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out'>
								Sign Up
							</button>
						</div>
					</div>
				</div>
				<div className='w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink'>
					<div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow dark:bg-gray-300'>
						<a
							href='#'
							className='flex flex-wrap no-underline hover:no-underline'>
							<p className='w-full text-gray-600 text-xs md:text-sm px-6 pt-5'>
								Check it out
							</p>
							<div className='w-full font-bold text-xl text-gray-800 px-6'>
								Explore the software and see what it can do for you
							</div>
							<p className='text-gray-800 text-base px-6 mb-5'>
								You can demo the software and try out some of the features
							</p>
						</a>
					</div>
					<div className='flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6 dark:bg-gray-200'>
						<div className='flex items-center justify-center'>
							<button className='mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out'>
								Action
							</button>
						</div>
					</div>
				</div>
				<div className='w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink'>
					<div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow dark:bg-gray-300'>
						<a
							href='#'
							className='flex flex-wrap no-underline hover:no-underline'>
							<p className='w-full text-gray-600 text-xs md:text-sm px-6 pt-5'>
								Get in contact
							</p>
							<div className='w-full font-bold text-xl text-gray-800 px-6'>
								Impressed? I thought so!
							</div>
							<p className='text-gray-800 text-base px-6 mb-5'>
								Although this software is a proof of concept and exemplifies the technical strengths of the developer, it is not yet ready for production use.  If you are interested in the idea behind this project or would like to create something like this for your business, contact the developer.
							</p>
						</a>
					</div>
					<div className='flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6 dark:bg-gray-200'>
						<div className='flex items-center justify-end'>
							<button className='mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out'>
								Action
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default GettingStarted
