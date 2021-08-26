import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import BaseLayout from '../../layout/OrganizationLayout'

const UsersPage = () => {
	// const userController = {}
	const users: { id: number; title: string; description: string }[] = [
		{
			id: 15,
			title: 'New User',
			description: 'Demo description',
		},
	]
	return (
		<BaseLayout>
			<div>
				<div className="m-3">
					<div></div>
					<div>
						<Table variant="simple">
							<TableCaption>
								Imperial to metric conversion factors
							</TableCaption>
							<Thead>
								<Tr>
									<Th>ID</Th>
									<Th>Title</Th>
									<Th>Description</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users.map((user) => (
									<Tr key={user.id}>
										<Td>{user.id}</Td>
										<Td>{user.title}</Td>
										<Td isTruncated>{user.description}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</div>
				</div>
			</div>
		</BaseLayout>
	)
}

export default UsersPage
