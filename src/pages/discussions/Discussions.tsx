import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
	Button,
	IconButton,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react'
import TimeAgo from 'javascript-time-ago'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import {
	addDiscussion,
	deleteDiscussion,
	fetchDiscussionList,
} from 'store/modules/discussion/discussionSlice'
import DiscussionAddDrawer from './DiscussionAdd.drawer'

const DiscussionsPage = () => {
	const dispatch = useDispatch()
	const { discussion } = useSelector((state: RootState) => state)
	const timeAgo = new TimeAgo('en-US')
	const drawer = useDisclosure()

	const disucssionController = {
		add: {
			drawer: drawer,
			async submit() {
				try {
					await addDiscussion(discussion.addDiscussionForm)
					dispatch(fetchDiscussionList())
				} catch (err) {
					console.log(err)
				}
			},
		},
		delete: {
			async submit(discussionId: string) {
				await deleteDiscussion({ id: discussionId })
				dispatch(fetchDiscussionList())
			},
		},
	}

	useEffect(() => {
		dispatch(fetchDiscussionList())
	}, [])

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
					{!discussion.discussionList.length && (
						<TableCaption>
							These were all the Discussions
						</TableCaption>
					)}
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Description</Th>
							<Th className="text-right">Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{discussion.discussionList.map((discussion) => (
							<Tr key={discussion.id}>
								<Td>{discussion.title}</Td>
								<Td>{discussion.description}</Td>
								<Td className="text-right">
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
											disucssionController.delete.submit(
												discussion.id,
											)
										}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
			<DiscussionAddDrawer
				drawer={disucssionController.add.drawer}
				onSubmit={() => disucssionController.add.submit()}
			></DiscussionAddDrawer>
		</div>
	)
}

export default DiscussionsPage
