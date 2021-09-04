import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import {
	Avatar,
	IconButton,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import TimeAgo from 'javascript-time-ago'
import React, { useEffect, useState } from 'react'
import { Form } from 'services/form'
import { fetchUsers, User } from 'store/modules/user/userSlice'
import { FormDrawerController } from 'types/types'
import VerificationStatus from './components/VerificationStatus'

export interface UpdateUserApprovalStatusBody {
	userId: string
	status: boolean
}

export interface DeleteUserBody {
	_id: string
}

const UsersPage = () => {
	const timeAgo = new TimeAgo('en-US')

	const [userList, setUserList] = useState<User[]>([])

	const fetchUserList = async () => {
		setUserList(await fetchUsers())
	}

	useEffect(() => {
		fetchUserList()
	}, [])

	const updateUserApprovalStatusFormFieldsInitial: UpdateUserApprovalStatusBody =
		{
			userId: '',
			status: false,
		}
	const [
		updateUserApprovalStatusFormFields,
		setUpdateUserApprovalStatusFormFields,
	] = useState<Partial<UpdateUserApprovalStatusBody>>(
		updateUserApprovalStatusFormFieldsInitial,
	)

	const deleteUserFormFieldsInitial = {
		_id: '',
	}
	const [deleteUserFormFields, setDeleteUserFormFields] = useState<
		Partial<DeleteUserBody>
	>(deleteUserFormFieldsInitial)

	const userController: {
		delete: FormDrawerController<DeleteUserBody>
		updateApprovalStatus: FormDrawerController<UpdateUserApprovalStatusBody>
	} = {
		delete: {
			form: new Form(deleteUserFormFields),
			updateFields: (props: Partial<DeleteUserBody>) =>
				setDeleteUserFormFields({
					...deleteUserFormFields,
					...props,
				}),
			async onSubmit(userId: string) {
				userController.delete.form.fields._id = userId
				await userController.delete.form.submit('user', {
					method: 'DELETE',
				})
				await fetchUserList()
			},
		},
		updateApprovalStatus: {
			form: new Form(updateUserApprovalStatusFormFields),
			updateFields: (props: Partial<UpdateUserApprovalStatusBody>) =>
				setUpdateUserApprovalStatusFormFields({
					...updateUserApprovalStatusFormFields,
					...props,
				}),
			async onSubmit({
				userId,
				status,
			}: {
				userId: string
				status: boolean
			}) {
				userController.updateApprovalStatus.form.fields.userId = userId
				userController.updateApprovalStatus.form.fields.status = status
				await userController.updateApprovalStatus.form.submit(
					'user/verify',
					{
						method: 'PUT',
					},
				)
				await fetchUserList()
			},
		},
	}

	return (
		<div>
			<div className="px-6 py-3">
				<div>
					<div className="text-3xl text-gray-700 font-semibold">
						Users
					</div>
					<div className="text-gray-600">
						Here you will see all the available users
					</div>
				</div>
			</div>
			<div className="border-b-2"></div>
			<div className="mt-3">
				<Table variant="simple">
					{!userList.length && (
						<TableCaption>These were all the Users</TableCaption>
					)}
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Email</Th>
							<Th>Status</Th>
							<Th>Registered At</Th>
							<Th className="text-right">Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{userList.map((user) => (
							<Tr key={user._id}>
								<Td>
									<div className="flex items-center">
										<Avatar
											src={user.googleAvatarUrl}
											size="sm"
										/>
										<div className="pl-2">{user.name}</div>
									</div>
								</Td>
								<Td>{user.email}</Td>
								<Td>
									<VerificationStatus user={user} />
								</Td>
								<Td>
									{' '}
									{timeAgo.format(new Date(user.createdAt))}
								</Td>
								<Td className="text-right">
									<IconButton
										aria-label="approve"
										icon={<CheckIcon />}
										size="sm"
										backgroundColor={
											user.isVerified && user.verifiedAt
												? 'green.600'
												: 'green.100'
										}
										_hover={{
											backgroundColor:
												user.isVerified &&
												user.verifiedAt
													? 'green.500'
													: 'green.200',
										}}
										color={
											user.isVerified && user.verifiedAt
												? 'green.100'
												: 'green.600'
										}
										className="shadow"
										onClick={() =>
											userController.updateApprovalStatus.onSubmit(
												{
													userId: user._id,
													status: true,
												},
											)
										}
									/>
									<IconButton
										aria-label="reject"
										icon={<CloseIcon />}
										size="sm"
										backgroundColor={
											!user.isVerified && user.verifiedAt
												? 'red.600'
												: 'red.100'
										}
										_hover={{
											backgroundColor:
												!user.isVerified &&
												user.verifiedAt
													? 'red.500'
													: 'red.200',
										}}
										color={
											!user.isVerified && user.verifiedAt
												? 'red.100'
												: 'red.600'
										}
										className="mx-2 shadow"
										onClick={() =>
											userController.updateApprovalStatus.onSubmit(
												{
													userId: user._id,
													status: false,
												},
											)
										}
									/>
									<IconButton
										aria-label="delete"
										icon={<DeleteIcon />}
										size="sm"
										backgroundColor="red.100"
										_hover={{
											backgroundColor: 'red.200',
										}}
										color="red.600"
										className="shadow"
										onClick={() =>
											userController.delete.onSubmit(
												user._id,
											)
										}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
		</div>
	)
}

export default UsersPage
