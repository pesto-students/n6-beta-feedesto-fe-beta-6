import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'

const UsersPage = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state)

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
					<TableCaption>
						Imperial to metric conversion factors
					</TableCaption>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Title</Th>
							<Th>Description</Th>
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{user.userList.map((user) => (
							<Tr key={user.id}>
								<Td>{user.id}</Td>
								<Td>{user.name}</Td>
								<Td>{user.email}</Td>
								<Td>{user.isVerified}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
		</div>
	)
}

export default UsersPage
