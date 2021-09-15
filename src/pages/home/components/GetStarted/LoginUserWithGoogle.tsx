import { Image, Radio, RadioGroup } from '@chakra-ui/react'
import { Routes } from 'navigation/routes'
import { useState } from 'react'
import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Form } from 'services/form'
import { setAuthLoginType, setAuthToken } from 'store/modules/auth/authSlice'
import { LoginUserBody } from 'store/modules/auth/services'
import {
	User,
	fetchUserDetails,
	setCurrentUser,
} from 'store/modules/user/userSlice'
import { FormController } from 'types/types'
import { LoginStep, LoginType } from '../../../../types/enums'

interface LoginUserWithGoogleComponentProps {
	loginType: LoginType
	handleLoginTypeChange: (loginType: LoginType) => void
	handleLoginStepChange: (
		loginStep: LoginStep,
		googleResponse?: GoogleLoginResponse,
	) => void
}

const LoginUserWithGoogle = ({
	loginType,
	handleLoginTypeChange,
	handleLoginStepChange,
}: LoginUserWithGoogleComponentProps) => {
	const dispatch = useDispatch()
	const history = useHistory()

	let googleUserId = ''
	// Login User with Google
	const loginUserFormFieldsInitial: LoginUserBody = {
		googleUserId: '',
		loginType,
	}
	const [loginUserFormFields, setLoginUserFormFields] = useState<
		Partial<LoginUserBody>
	>(loginUserFormFieldsInitial)

	const loginUserController: FormController<LoginUserBody> = {
		form: new Form(loginUserFormFields),
		updateFields: (props) => {
			setLoginUserFormFields((old) => {
				return {
					...old,
					...props,
				}
			})
		},
		async onSubmit(googleResponse: GoogleLoginResponse) {
			try {
				loginUserController.form.fields.loginType = loginType
				loginUserController.form.fields.googleUserId = googleUserId
				const response = await loginUserController.form.submit(
					'auth/login',
					{
						method: 'POST',
					},
				)
				dispatch(setAuthToken(response.token))
				dispatch(setAuthLoginType(LoginType.ORGANIZATION))

				const [user]: User[] | undefined = await fetchUserDetails()
				if (user) {
					toast.success('Authentication Successful', {
						position: 'bottom-right',
					})
					dispatch(setCurrentUser(user))
					history.push(Routes.ADMIN_USERS)
				} else {
					toast.error('Some error occured while finding user')
				}
			} catch (err) {
				console.log(err)
				handleLoginStepChange(LoginStep.REGISTER, googleResponse)
			}
		},
	}

	const handleGoogleLoginSuccess = async (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		response = response as GoogleLoginResponse

		if (response) {
			googleUserId = response.getBasicProfile().getId()
			loginUserController.updateFields({
				loginType,
				googleUserId,
			})
			loginUserController.onSubmit(response)
		}
	}

	const handleGoogleLoginFailure = (response: GoogleLoginResponse) => {
		console.log(response)
	}

	return (
		<div className="px-6 py-8">
			<div className="text-gray-700 font-semibold">Continue as</div>
			<div className="py-3">
				<RadioGroup
					value={loginType}
					className="grid grid-cols-2"
					onChange={(val) => handleLoginTypeChange(val as LoginType)}
					data-testid="entity-type-radio"
				>
					<Radio
						className="col"
						value={LoginType.USER}
						data-testid="entity-type-user-radio"
					>
						User
					</Radio>

					<Radio
						className="col"
						value={LoginType.ORGANIZATION}
						data-testid="entity-type-organization-radio"
					>
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
							data-testid="google-login"
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
	)
}

export default LoginUserWithGoogle
