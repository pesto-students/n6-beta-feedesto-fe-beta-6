import { useState } from 'react'
import { GoogleLoginResponse } from 'react-google-login'
import { LoginStep, LoginType } from 'types/enums'
import LoginUserWithGoogle from './LoginUserWithGoogle'
import OrganizationDetailInputs from './OrganizationDetailInputs'
import UserDetailInputs from './UserDetailInputs'

const GetStarted: React.FC = () => {
	const [loginStep, setLoginStep] = useState<LoginStep>(LoginStep.LOGIN)
	const [loginType, setLoginType] = useState<LoginType>(LoginType.USER)
	const [googleResponse, setGoogleResponse] = useState<GoogleLoginResponse>()

	const registrationInputView =
		loginType === LoginType.USER ? (
			<UserDetailInputs
				handleLoginStepChange={(step) => setLoginStep(step)}
				googleResponse={googleResponse}
			/>
		) : (
			<OrganizationDetailInputs
				handleLoginStepChange={(step) => setLoginStep(step)}
				googleResponse={googleResponse}
			/>
		)

	return (
		<div className="bg-gray-100 rounded-2xl ">
			<div>
				<div className="border-b border-gray-200 p-4 text-2xl font-semibold text-gray-600 text-center">
					Get Started
				</div>
				{loginStep === LoginStep.LOGIN ? (
					<LoginUserWithGoogle
						loginType={loginType}
						handleLoginTypeChange={(type) => setLoginType(type)}
						handleLoginStepChange={(step, googleResponse) => {
							setGoogleResponse(googleResponse)
							setLoginStep(step)
						}}
					/>
				) : (
					registrationInputView
				)}
			</div>
		</div>
	)
}
export default GetStarted

export { LoginUserWithGoogle, OrganizationDetailInputs, UserDetailInputs }
