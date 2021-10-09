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
import { fetchUserDetails, setCurrentUser } from 'store/modules/user/userSlice'
import { FormController } from 'types/types'
import { User } from 'types/models/user'
import { LoginStep, LoginType } from 'types/enums'

export interface LoginUserBody {
	loginType: LoginType
	googleUserId: string
}

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
			setLoginUserFormFields({
				...loginUserFormFields,
				...props,
			})
			loginUserController.form.fields = {
				...loginUserFormFields,
				...props,
			}
		},
		async onSubmit(googleResponse: GoogleLoginResponse) {
			try {
				const response = await loginUserController.form.submit(
					'auth/login',
					{
						method: 'POST',
					},
				)
				dispatch(setAuthToken(response.token))
				dispatch(setAuthLoginType(loginType))

				const [user]: User[] | undefined = await fetchUserDetails()
				if (user) {
					toast.success('Authentication Successful', {
						position: 'bottom-right',
					})
					dispatch(setCurrentUser(user))
					if (loginType === LoginType.ORGANIZATION) {
						history.push(Routes.ADMIN_USERS)
					} else {
						history.push(Routes.DASHBOARD)
					}
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
		response?: GoogleLoginResponse | GoogleLoginResponseOffline,
		googleUserId?: string,
	) => {
		response = response as GoogleLoginResponse

		if (googleUserId || response) {
			loginUserController.updateFields({
				loginType,
				googleUserId:
					googleUserId ?? response.getBasicProfile().getId(),
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
						className="col cursor-pointer"
						value={LoginType.USER}
						data-testid="entity-type-user-radio"
					>
						<span className="cursor-pointer">User</span>
					</Radio>

					<Radio
						className="col cursor-pointer"
						value={LoginType.ORGANIZATION}
						data-testid="entity-type-organization-radio"
					>
						<span className="cursor-pointer">Organization</span>
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
			<div className="text-gray-500 font-semibold mt-5">
				Want to have a peek inside?
			</div>
			<div className="pt-3">
				<button
					onClick={() =>
						handleGoogleLoginSuccess(
							undefined,
							loginType == LoginType.ORGANIZATION
								? '106393911219559234350'
								: '106962698788100602521',
						)
					}
					className="bg-gray-800 px-3 py-2 w-full rounded-xl shadow-lg font-semibold text-left"
				>
					<div className="text-white text-lg text-center">
						Try demo as
						{loginType == LoginType.ORGANIZATION
							? ' an Organization'
							: ' a User'}
					</div>
				</button>
			</div>
		</div>
	)
}

export default LoginUserWithGoogle
