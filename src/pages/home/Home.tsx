import { Image } from '@chakra-ui/react'
import { APP, USERS } from 'navigation/routes'
import React, { useEffect, useState } from 'react'
import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store'
import { loginUser } from 'store/modules/auth/services'
import { LoginType } from 'types/enums'
import {
	fillAuthLoginUserFields,
	fillAuthRegisterOrganizationFields,
	fillAuthRegisterUserFields,
	setIsGoogleLoggedIn,
} from '../../store/modules/auth/authSlice'
import GetStarted from './GetStarted'

const Home = () => {
	const dispatch = useDispatch()
	const { auth } = useSelector((state: RootState) => state)
	const [googleLoginResponse, setGoogleLoginResponse] =
		useState<GoogleLoginResponse | null>(null)
	const history = useHistory()

	const handleGoogleLoginSuccess = async (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		response = response as GoogleLoginResponse
		setGoogleLoginResponse(response)
		dispatch(setIsGoogleLoggedIn(true))

		if (response) {
			dispatch(
				loginUser({
					googleUserId: response.getBasicProfile().getId(),
				}),
			)
		}
	}

	useEffect(() => {
		if (auth.isAuthenticated) {
			toast.success('Authentication Successful', {
				position: 'bottom-right',
			})
			if (auth.loginType === LoginType.ORGANIZATION) {
				history.push(USERS)
			} else {
				history.push(APP)
			}
		}
	}, [auth.isAuthenticated])

	useEffect(() => {
		console.log(
			auth.isGoogleLoggedIn,
			auth.isAuthenticated,
			googleLoginResponse,
		)
		if (
			auth.isGoogleLoggedIn &&
			!auth.isAuthenticated &&
			googleLoginResponse
		) {
			fillRegistrationPrefillDetails(googleLoginResponse)
		}
	}, [auth.isGoogleLoggedIn])

	const fillRegistrationPrefillDetails = (response: GoogleLoginResponse) => {
		const name = response.getBasicProfile().getName()
		const email = response.getBasicProfile().getEmail()
		const googleUserId = response.getBasicProfile().getId()
		dispatch(
			fillAuthRegisterUserFields({
				name,
				googleUserId,
				email,
			}),
		)
		dispatch(
			fillAuthRegisterOrganizationFields({
				name,
				email,
				googleUserId,
			}),
		)
	}

	const handleGoogleLoginFailure = (response: GoogleLoginResponse) => {
		console.log(response)
	}

	return (
		<div>
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
							<div
								className="text-7xl text-gray-800"
								data-testid="tagline"
							>
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
