import { Image } from '@chakra-ui/react'
import { Routes } from 'navigation/routes'
import React, { useEffect, useState } from 'react'
import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { sendRequest } from 'services/networkService'
import { RootState } from 'store'
import { loginUser } from 'store/modules/auth/services'
import {
	fetchUserDetails,
	fetchUsers,
	setCurrentUser,
	User,
} from 'store/modules/user/userSlice'
import { LoginType } from 'types/enums'
import {
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
					loginType: auth.loginType,
					googleUserId: response.getBasicProfile().getId(),
				}),
			)
		}
	}

	const redirectToSpecifiedRoute = async () => {
		const userList: User[] | undefined = await fetchUserDetails()
		if (userList?.length) {
			dispatch(setCurrentUser(userList[0]))
		}
		if (auth.loginType === LoginType.ORGANIZATION) {
			history.push(Routes.ADMIN_USERS)
		} else {
			history.push(Routes.DASHBOARD)
		}
	}

	useEffect(() => {
		if (auth.isAuthenticated) {
			toast.success('Authentication Successful', {
				position: 'bottom-right',
			})
			redirectToSpecifiedRoute()
		}
	}, [auth.isAuthenticated])

	useEffect(() => {
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
		const googleAvatarUrl = response.getBasicProfile().getImageUrl()
		const googleUserId = response.getBasicProfile().getId()
		if (auth.loginType === LoginType.USER) {
			dispatch(
				fillAuthRegisterUserFields({
					name,
					googleUserId,
					email,
					googleAvatarUrl,
				}),
			)
		} else if (auth.loginType === LoginType.ORGANIZATION) {
			dispatch(
				fillAuthRegisterOrganizationFields({
					name,
					email,
					googleUserId,
					googleAvatarUrl,
				}),
			)
		}
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
