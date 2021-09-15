import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Input, Link } from '@chakra-ui/react'
import { Routes } from 'navigation/routes'
import React, { useEffect, useState } from 'react'
import { GoogleLoginResponse } from 'react-google-login'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Form } from 'services/form'
import { setAuthLoginType, setAuthToken } from 'store/modules/auth/authSlice'
import { RegisterOrganizationBody } from 'store/modules/auth/services'
import {
	fetchUserDetails,
	setCurrentUser,
	User,
} from 'store/modules/user/userSlice'
import { FormController } from 'types/types'
import { LoginStep, LoginType } from '../../../../types/enums'

const OrganizationDetailInputs: React.FC<{
	handleLoginStepChange: (step: LoginStep) => void
	googleResponse?: GoogleLoginResponse
}> = ({ handleLoginStepChange, googleResponse }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	// Register Organization in step 2 if account does not exist
	const registerOrganizationFormFieldsInitial: RegisterOrganizationBody = {
		googleUserId: '',
		email: '',
		name: '',
		organizationName: '',
	}
	const [registerOrganizationFormFields, setRegisterOrganizationFormFields] =
		useState<Partial<RegisterOrganizationBody>>(
			registerOrganizationFormFieldsInitial,
		)

	const fillRegistrationPrefillDetails = (response: GoogleLoginResponse) => {
		const name = response.getBasicProfile().getName()
		const email = response.getBasicProfile().getEmail()
		const googleAvatarUrl = response.getBasicProfile().getImageUrl()
		const googleUserId = response.getBasicProfile().getId()

		registerOrganizationController.updateFields({
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

	const registerOrganizationController: FormController<RegisterOrganizationBody> =
		{
			form: new Form(registerOrganizationFormFields),
			updateFields: (props) =>
				setRegisterOrganizationFormFields({
					...registerOrganizationFormFields,
					...props,
				}),
			async onSubmit() {
				try {
					const response =
						await registerOrganizationController.form.submit(
							'auth/register/organization',
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
						value={registerOrganizationController.form.fields.name}
						onChange={(e) =>
							registerOrganizationController.updateFields({
								name: e.target.value,
							})
						}
					/>
				</div>
			</div>
			<div className="pt-3">
				<div className="text-gray-700 font-semibold">
					Organization Name
				</div>
				<div className="pt-1">
					<Input
						placeholder="Synergy Textiles Pvt. Ltd."
						background="white"
						onChange={(e) =>
							registerOrganizationController.updateFields({
								organizationName: e.target.value,
							})
						}
						autoFocus
					/>
				</div>
			</div>
			{/* <div className="pt-3">
				<div className="text-gray-700 font-semibold">Strength</div>
				<div className="pt-1">
					<Select
						placeholder="Select option"
						background="white"
						value={auth.registerOrganizationForm.}
						onChange={(val) => {
							dispatch(
								organizationStrengthUpdate(val.target.value),
							)
						}}
					>
						{[
							'1 to 10 Employees',
							'10 to 100 Employees',
							'100 to 500 Employees',
							'500+ Employees',
						].map((strength) => (
							<option value={strength} key={strength}>
								{strength}
							</option>
						))}
					</Select>
				</div>
			</div>
			<div className="pt-3">
				<div className="text-gray-700 font-semibold">Designation</div>
				<div className="pt-1">
					<Input
						placeholder="Senior Executive"
						background="white"
						onChange={(e) =>
							dispatch(
								organizationDesignationInputTextUpdate(
									e.target.value,
								),
							)
						}
					/>
				</div>
			</div> */}
			<div className="pt-6">
				<Button
					className="text-white"
					background="gray.700"
					_hover={{ bg: 'gray.800' }}
					_active={{ bg: 'gray.700' }}
					isFullWidth={true}
					onClick={() => registerOrganizationController.onSubmit()}
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

export default OrganizationDetailInputs
