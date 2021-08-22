import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Icon, Input, Link, Select } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import {
	organizationUpdate,
	organizationDesignationInputTextUpdate,
	organizationNameInputTextUpdate,
	tabUpdate,
	userNameInputTextUpdate,
	organizationStrengthUpdate,
} from 'store/modules/auth/authSlice'
import { fetchOrganizationList } from 'store/modules/organization/organizationSlice'
import { SelectedTab } from 'types/enums'

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
						value={auth.userNameInputText}
						onChange={(e) =>
							dispatch(userNameInputTextUpdate(e.target.value))
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
								organizationNameInputTextUpdate(e.target.value),
							)
						}
					/>
				</div>
			</div>
			<div className="pt-3">
				<div className="text-gray-700 font-semibold">Strength</div>
				<div className="pt-1">
					<Select
						placeholder="Select option"
						background="white"
						value={auth.selectedOrganizationId}
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
			</div>
			<div className="pt-6">
				<Button
					className="text-white"
					background="gray.700"
					_hover={{ bg: 'gray.800' }}
					_active={{ bg: 'gray.700' }}
					isFullWidth={true}
				>
					Finish
				</Button>
			</div>
			<div className="pt-3 text-center">
				<Link
					color="gray.600"
					onClick={() => {
						dispatch(tabUpdate(SelectedTab.GET_STARTED))
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
