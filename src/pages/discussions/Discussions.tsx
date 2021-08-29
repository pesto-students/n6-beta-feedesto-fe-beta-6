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
import BaseLayout from '../../components/layout/AdminLayout'
import DiscussionAddDrawer, {
	DiscussionAddFormProps,
} from './DiscussionAdd.drawer'
import React from 'react'

const DiscussionsPage = () => {
	const drawer = useDisclosure()
	const disucssionController = {
		add: {
			drawer: drawer,
			form: {
				title: '',
				description: '',
			},
			async submit({ title, description }: DiscussionAddFormProps) {
				try {
					let result = await fetch(
						'https://api.feedesto.com/disucssion/add/v1',
						{
							method: 'POST',
							body: JSON.stringify({ title, description }),
						},
					).then((res) => {
						return res.json()
					})
				} catch (err) {
					console.error(err)
				}
			},
		},
	}
	const disucssions: { id: number; title: string; description: string }[] = [
		{
			id: 15,
			title: 'New Discussion',
			description: 'Demo description',
		},
	]
	return (
		<div>
			<div className="flex items-center justify-between px-6 py-3">
				<div>
					<div className="text-3xl text-gray-700 font-semibold">
						Discussions
					</div>
					<div className="text-gray-600">
						Here you will see all the available discussions
					</div>
				</div>
				<div>
					<Button
						leftIcon={<AddIcon />}
						colorScheme="teal"
						onClick={disucssionController.add.drawer.onOpen}
					>
						Add Discussion
					</Button>
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
						</Tr>
					</Thead>
					<Tbody>
						{disucssions.map((disucssion) => (
							<Tr key={disucssion.id}>
								<Td>{disucssion.id}</Td>
								<Td>{disucssion.title}</Td>
								<Td isTruncated>{disucssion.description}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
			<DiscussionAddDrawer
				drawer={disucssionController.add.drawer}
				onSubmit={disucssionController.add.submit}
			></DiscussionAddDrawer>
		</div>
	)
}

export default DiscussionsPage
