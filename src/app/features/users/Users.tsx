import { AddIcon } from '@chakra-ui/icons'
import {
	Button,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react'
import BaseLayout from '../layout/BaseLayout'
import UserAddDrawer, { UserAddFormProps } from './UserAdd.drawer'

const UsersPage = () => {
	const drawer = useDisclosure()
	const userController = {
		add: {
			drawer: drawer,
			form: {
				title: '',
				description: '',
			},
			async submit({ title, description }: UserAddFormProps) {
				try {
					let result = await fetch(
						'https://gateway.sevafalamforensic.com/user/add/v1',
						{
							method: 'POST',
							body: JSON.stringify({ title, description }),
						},
					).then((res) => {
						return res.json()
					})
					console.log(result)
				} catch (err) {
					console.error(err)
				}
			},
		},
	}
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
					<div>
						<Button
							leftIcon={<AddIcon />}
							colorScheme="teal"
							onClick={userController.add.drawer.onOpen}
						>
							Add User
						</Button>
					</div>
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
				<UserAddDrawer
					drawer={userController.add.drawer}
					onSubmit={userController.add.submit}
				></UserAddDrawer>
			</div>
		</BaseLayout>
	)
}

export default UsersPage
