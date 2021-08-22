import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Icon, Input, Link, Select } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import {
	organizationUpdate,
	tabUpdate,
	userNameInputTextUpdate,
} from 'store/modules/auth/authSlice'
import { fetchOrganizationList } from 'store/modules/organization/organizationSlice'
import { SelectedTab } from 'types/enums'

const UserDetailInputs: React.FC = () => {
	const dispatch = useDispatch()
	const { organization, auth } = useSelector((state: RootState) => state)

	const handleFetchOrganizations = useCallback(async () => {
		await dispatch(fetchOrganizationList())
	}, [dispatch])

	useEffect(() => {
		handleFetchOrganizations()
	}, [handleFetchOrganizations])

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
				<div className="text-gray-700 font-semibold">Organization</div>
				<div className="pt-1">
					<Select
						placeholder="Select option"
						background="white"
						value={auth.selectedOrganizationId}
						onChange={(val) => {
							dispatch(organizationUpdate(val.target.value))
						}}
					>
						{organization.organizationList.map((org) => (
							<option value={org.id} key={org.id}>
								{org.login}
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

export default UserDetailInputs
