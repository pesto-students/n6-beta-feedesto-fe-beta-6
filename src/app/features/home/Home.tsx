import { Image } from '@chakra-ui/react'
import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import { useDispatch } from 'react-redux'
import {
	googleAuthTokenUpdate,
	tabUpdate,
	userNameInputTextUpdate,
} from '../../store/modules/auth/authSlice'
import { SelectedTab } from '../../types/enums'
import GetStarted from './GetStarted'

const Home = () => {
	const dispatch = useDispatch()

	const handleGoogleLoginSuccess = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		response = response as GoogleLoginResponse
		if (response) {
			dispatch(
				userNameInputTextUpdate(response.getBasicProfile().getName()),
			)
			dispatch(googleAuthTokenUpdate(response.tokenId))

			dispatch(tabUpdate(SelectedTab.DETAILS_INPUT))
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
