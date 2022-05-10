import React from 'react'
import Banner from '../svg/Banner'
import TravelBooking from '../svg/TravelBooking'
import ConnectedWorld from '../svg/ConnectedWorld'
import Image from 'next/image'

function Features() {
	return (
		<section className='bg-white py-8 dark:bg-gray-700 dark:text-gray-100'>
			<div className='container max-w-5xl mx-auto m-8'>
				<h1 className='z-10 w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 dark:text-white'>
					Features
				</h1>
				<div className='w-full mb-4'>
					<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
				</div>
				<div className='flex flex-wrap'>
					<div className='w-5/6 sm:w-1/2 p-6'>
						<h3 className='text-3xl text-gray-800 font-bold leading-none mb-3 dark:text-gray-100'>
							Tools to help you manage your social life
						</h3>
						<p className='text-gray-600 mb-8 dark:text-gray-300'>
							The Social Brain Network allows you to manage your
							friends in groups with sizes defined by science!
							<br />
							<br />
							Images from: &nbsp;
							<a
								className='text-pink-500 underline'
								href='https://undraw.co/'>
								undraw.co
							</a>
						</p>
					</div>
					<div className='w-full sm:w-1/2 p-6'>
						{/* <Image
							src='/undraw_Group.png'
							width={500}
							height={500}
						/> */}
						<TravelBooking />
					</div>
				</div>
				<div className='flex flex-wrap flex-col-reverse sm:flex-row'>
					<div className='w-full sm:w-1/2 p-6 mt-6'>
						<ConnectedWorld />
					</div>
					<div className='w-full sm:w-1/2 p-6 mt-6'>
						<div className='align-middle'>
							<h3 className='text-3xl text-gray-800 font-bold leading-none mb-3 dark:text-gray-100'>
								Connect with people across the globe
							</h3>
							<p className='text-gray-600 mb-8 dark:text-gray-300'>
								The Social Brain Network allows you to chat with
								your friends 1-1 and share photos and stories
								about your life to keep the ones you love
								updated
								<br />
								<br />
								Images from: &nbsp;
								<a
									className='text-pink-500 underline'
									href='https://undraw.co/'>
									undraw.co
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Features
