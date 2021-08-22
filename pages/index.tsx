import { Image, Radio, RadioGroup } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import { RootState, store } from 'store'
import { tabChange } from 'store/modules/auth/authSlice'
import { SelectedTab } from 'types/enums'
import GetStarted from '@/components/home/GetStarted'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationList } from 'store/modules/organization/organizationSlice'

const Home: NextPage = () => {
	const dispatch = useDispatch()

	const handleGoogleLoginSuccess = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		response = response as GoogleLoginResponse
		if (response) {
			// TODO: Set tokenId temporarily for auth

			dispatch(tabChange(SelectedTab.DETAILS_INPUT))
		}
	}
	const handleGoogleLoginFailure = (response: GoogleLoginResponse) => {
		console.log(response)
	}

	return (
		<div>
			<Head>
				<title>Feedesto | Home</title>
			</Head>
			<main>
				<header>
					<div className="mt-8 px-12">
						<Image
							className="h-16"
							src="/feedesto.svg"
							alt="Feedesto Logo"
						/>
					</div>
				</header>
				<div className="m-16">
					<div className="grid grid-cols-12">
						<div className="col-span-5">
							<div className="text-7xl text-gray-800">
								A <b>Decisive</b> buddy for your{' '}
								<b>Business.</b>
							</div>
						</div>
						<div className="col-span-3"></div>
						<div className="col-span-4">
							<GetStarted
								onLoginSuccess={handleGoogleLoginSuccess}
								onLoginFailure={handleGoogleLoginFailure}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Home
