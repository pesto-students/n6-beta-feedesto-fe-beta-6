import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Input, Link, Select } from '@chakra-ui/react'
import { Routes } from 'navigation/routes'
import React, { useEffect, useState } from 'react'
import { GoogleLoginResponse } from 'react-google-login'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form } from 'services/form'
import { setAuthLoginType, setAuthToken } from 'store/modules/auth/authSlice'
import { fetchUserDetails, setCurrentUser } from 'store/modules/user/userSlice'
import { FormController } from 'types/types'
import { User } from 'types/models/user'
import { fetchOrganizations } from 'store/modules/organization/organizationSlice'
import { LoginStep, LoginType } from 'types/enums'
import { Organization } from 'types/models/organization'

export interface RegisterUserBody {
	name: string
	email: string
	googleUserId: string
	googleAvatarUrl?: string
	organizationId: string
}

const UserDetailInputs: React.FC<{
	handleLoginStepChange: (step: LoginStep) => void
	googleResponse?: GoogleLoginResponse
}> = ({ handleLoginStepChange, googleResponse }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [organizationList, setOrganizationList] = useState<Organization[]>([])

	const fetchOrganizationList = async () => {
		setOrganizationList(await fetchOrganizations())
	}

	useEffect(() => {
		fetchOrganizationList()
	}, [])

	const fillRegistrationPrefillDetails = (response: GoogleLoginResponse) => {
		const name = response.getBasicProfile().getName()
		const email = response.getBasicProfile().getEmail()
		const googleAvatarUrl = response.getBasicProfile().getImageUrl()
		const googleUserId = response.getBasicProfile().getId()

		registerUserController.updateFields({
			name,
			email,
			googleUserId,
			googleAvatarUrl,
		})
	}

	useEffect(() => {
		if (googleResponse) {
			fillRegistrationPrefillDetails(googleResponse)
		}
	}, [googleResponse])

	// Register User in step 2 if account does not exist
	const registerUserFormFieldsInitial: RegisterUserBody = {
		googleUserId: '',
		name: '',
		email: '',
		organizationId: '',
	}
	const [registerUserFormFields, setRegisterUserFormFields] = useState<
		Partial<RegisterUserBody>
	>(registerUserFormFieldsInitial)

	const registerUserController: FormController<RegisterUserBody> = {
		form: new Form(registerUserFormFields),
		updateFields: (props) =>
			setRegisterUserFormFields({
				...registerUserFormFields,
				...props,
			}),
		async onSubmit() {
			try {
				const response = await registerUserController.form.submit(
					'auth/register/user',
					{
						method: 'POST',
					},
				)

				dispatch(setAuthToken(response.token))
				dispatch(setAuthLoginType(LoginType.USER))

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
			}
		},
	}

	return (
		<div className="px-6 pt-3 pb-6">
			<div>
				<div className="text-gray-700 font-semibold">Your Name</div>
				<div className="pt-1">
					<Input
						placeholder="Saurabh Singh"
						background="white"
						value={registerUserController.form.fields.name}
						onChange={(e) =>
							registerUserController.updateFields({
								name: e.target.value,
							})
						}
					/>
				</div>
			</div>
			<div className="pt-3">
				<div className="text-gray-700 font-semibold">Organization</div>
				<div className="pt-1">
					<Select
						placeholder="Select option"
						background="white"
						value={
							registerUserController.form.fields.organizationId
						}
						onChange={(val) => {
							registerUserController.updateFields({
								organizationId: val.target.value,
							})
						}}
					>
						{organizationList.map((org) => (
							<option value={org._id} key={org._id}>
								{org.name}
							</option>
						))}
					</Select>
				</div>
			</div>
			<div className="pt-6">
				<Button
					className="text-white"
					background="gray.700"
					_hover={{ bg: 'gray.800' }}
					_active={{ bg: 'gray.700' }}
					isFullWidth={true}
					onClick={() => registerUserController.onSubmit()}
				>
					Finish
				</Button>
			</div>
			<div className="pt-3 text-center">
				<Link
					color="gray.600"
					onClick={() => {
						handleLoginStepChange(LoginStep.LOGIN)
					}}
				>
					<div className="flex items-center justify-center">
						<ChevronLeftIcon />
						<span>Back to Home</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default UserDetailInputs
