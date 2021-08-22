import { Image, Radio, RadioGroup } from '@chakra-ui/react'
import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from 'store'
import { AuthState, loginTypeChange } from 'store/modules/auth/authSlice'
import { LoginType } from 'types/enums'

interface EntityTypeInputComponentProps {
	onLoginSuccess: (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => void
	onLoginFailure: (response: GoogleLoginResponse) => void
}

const EntityTypeInput = ({
	onLoginFailure,
	onLoginSuccess,
}: EntityTypeInputComponentProps) => {
	let auth = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()

	const updateLoginType = (e: string) => {
		if (e == 'user') {
			dispatch(loginTypeChange(LoginType.USER))
		} else {
			dispatch(loginTypeChange(LoginType.ORGANISATION))
		}
	}

	return (
		<div className="px-6 py-8">
			<div className="text-gray-700 font-semibold">Continue as</div>
			<div className="py-3">
				<RadioGroup
					value={auth.loginType}
					className="grid grid-cols-2"
					onChange={updateLoginType}
				>
					<Radio className="col" value={LoginType.USER}>
						User
					</Radio>

					<Radio className="col" value={LoginType.ORGANISATION}>
						Organization
					</Radio>
				</RadioGroup>
			</div>
			<div className="py-3">
				<GoogleLogin
					clientId="492830625886-0o5age87g2couk95tah2dasbbkr48tjs.apps.googleusercontent.com"
					render={(renderProps) => (
						<button
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							className="bg-white px-4 py-3 w-full rounded-xl shadow-lg font-semibold text-left"
						>
							<div className="flex items-center">
								<div className="flex-none">
									<Image
										src="/google-icon.svg"
										className="h-8"
										alt="Google Icon"
									/>
								</div>
								<div className="flex-1 pl-4 text-gray-600 text-lg">
									Continue with Google
								</div>
							</div>
						</button>
					)}
					buttonText="Login"
					onSuccess={onLoginSuccess}
					onFailure={onLoginFailure}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
		</div>
	)
}

export default EntityTypeInput
