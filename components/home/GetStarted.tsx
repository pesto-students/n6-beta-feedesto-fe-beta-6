import {
	Button,
	Image,
	Radio,
	RadioGroup,
	useRadioGroup,
} from '@chakra-ui/react'
import GoogleLogin, {
	GoogleLoginProps,
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'

export enum LoginType {
	USER = 'user',
	ORGANISATION = 'organisation',
}

const GetStarted = ({
	loginType,
	onChange,
}: {
	loginType: LoginType
	onChange: Function
}) => {
	const updateLoginType = (e: string) => {
		if (e == 'user') {
			onChange(LoginType.USER)
		} else {
			onChange(LoginType.ORGANISATION)
		}
	}

	const handleGoogleLoginSuccess = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		console.log(response)
	}
	const handleGoogleLoginFailure = (response: GoogleLoginResponse) => {
		console.log(response)
	}

	return (
		<div className="bg-gray-100 rounded-2xl ">
			<div className="">
				<div className="border-b border-gray-200 p-4 text-2xl font-semibold text-gray-500 text-center">
					Get Started
				</div>
				<div className="px-6 py-8">
					<div className="text-gray-700 font-semibold">
						Continue as
					</div>
					<div className="py-3">
						<RadioGroup
							value={loginType}
							className="grid grid-cols-2"
							onChange={updateLoginType}
						>
							<div className="col">
								<Radio value={LoginType.USER}>User</Radio>
							</div>
							<div className="col">
								<Radio value={LoginType.ORGANISATION}>
									Organization
								</Radio>
							</div>
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
							onSuccess={handleGoogleLoginSuccess}
							onFailure={handleGoogleLoginFailure}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default GetStarted
