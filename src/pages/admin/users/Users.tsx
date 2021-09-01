import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import {
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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import {
	deleteUser,
	fetchUserList,
	updateUserApprovalStatus,
} from 'store/modules/user/services'

const UsersPage = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state)
	const timeAgo = new TimeAgo('en-US')

	const handleUserApprove = async (userId: string) => {
		await updateUserApprovalStatus({ userId, status: true })
		dispatch(fetchUserList())
	}

	const handleUserReject = async (userId: string) => {
		await updateUserApprovalStatus({ userId, status: false })
		dispatch(fetchUserList())
	}

	const handleUserDelete = async (_id: string) => {
		await deleteUser({ _id })
		dispatch(fetchUserList())
	}

	useEffect(() => {
		dispatch(fetchUserList())
	}, [])

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
					{!user.userList.length && (
						<TableCaption>These were all the Users</TableCaption>
					)}
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Email</Th>
							<Th>Verified ?</Th>
							<Th>Registered At</Th>
							<Th className="text-right">Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{user.userList.map((user) => (
							<Tr key={user._id}>
								<Td>{user.name}</Td>
								<Td>{user.email}</Td>
								<Td>{user.isVerified ? 'Yes' : 'No'}</Td>
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
											user.isVerified
												? 'green.600'
												: 'green.100'
										}
										_hover={{
											backgroundColor: user.isVerified
												? 'green.500'
												: 'green.200',
										}}
										color={
											user.isVerified
												? 'green.100'
												: 'green.600'
										}
										className="shadow"
										onClick={() =>
											handleUserApprove(user._id)
										}
									/>
									<IconButton
										aria-label="reject"
										icon={<CloseIcon />}
										size="sm"
										backgroundColor={
											user.isVerified
												? 'red.100'
												: 'red.600'
										}
										_hover={{
											backgroundColor: user.isVerified
												? 'red.200'
												: 'red.500',
										}}
										color={
											user.isVerified
												? 'red.600'
												: 'red.100'
										}
										className="mx-2 shadow"
										onClick={() =>
											handleUserReject(user._id)
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
											handleUserDelete(user._id)
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
