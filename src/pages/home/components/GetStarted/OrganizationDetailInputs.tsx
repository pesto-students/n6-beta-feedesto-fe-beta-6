import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Input, Link } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerOrganization } from 'store/modules/auth/services'
import { RootState } from '../../../../store'
import {
	fillAuthRegisterOrganizationFields,
	setAuthSelectedTab,
} from '../../../../store/modules/auth/authSlice'
import { SelectedTab } from '../../../../types/enums'

const OrganizationDetailInputs: React.FC = () => {
	const dispatch = useDispatch()
	const { auth } = useSelector((state: RootState) => state)

	return (
		<div className="px-6 pt-3 pb-6">
			<div>
				<div className="text-gray-700 font-semibold">Your Name</div>
				<div className="pt-1">
					<Input
						placeholder="Saurabh Singh"
						background="white"
						value={auth.registerOrganizationForm.name}
						onChange={(e) =>
							dispatch(
								fillAuthRegisterOrganizationFields({
									name: e.target.value,
								}),
							)
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
							dispatch(
								fillAuthRegisterOrganizationFields({
									organizationName: e.target.value,
								}),
							)
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
					onClick={() =>
						dispatch(
							registerOrganization(auth.registerOrganizationForm),
						)
					}
				>
					Finish
				</Button>
			</div>
			<div className="pt-3 text-center">
				<Link
					color="gray.600"
					onClick={() => {
						dispatch(setAuthSelectedTab(SelectedTab.GET_STARTED))
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
