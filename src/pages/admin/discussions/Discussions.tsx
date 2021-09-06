import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
	Avatar,
	Button,
	IconButton,
	Table,
	TableCaption,
	Tag,
	TagLabel,
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
	Discussion,
	fetchDiscussionList,
	fillUpdateDiscussionFormFields,
	resetAddDiscussionFormFields,
	updateDiscussion,
} from 'store/modules/discussion/discussionSlice'
import DiscussionAddDrawer from './DiscussionAdd.drawer'
import dayjs from 'dayjs'
import DiscussionStatus from './components/DiscussionStatus'
import DiscussionUpdateDrawer from './DiscussionUpdate.drawer'

const DiscussionsPage = () => {
	const dispatch = useDispatch()
	const { discussion } = useSelector((state: RootState) => state)
	const timeAgo = new TimeAgo('en-US')
	const discussionAddDrawer = useDisclosure()
	const discussionUpdateDrawer = useDisclosure()

	const disucssionController = {
		add: {
			drawer: discussionAddDrawer,
			async submit() {
				try {
					await addDiscussion(discussion.addDiscussionForm)
					dispatch(fetchDiscussionList({}))
					discussionAddDrawer.onClose()
					dispatch(resetAddDiscussionFormFields())
				} catch (err) {
					console.log(err)
				}
			},
		},
		update: {
			drawer: discussionUpdateDrawer,
			async submit() {
				try {
					await updateDiscussion(discussion.updateDiscussionForm)
					dispatch(fetchDiscussionList({}))
					discussionUpdateDrawer.onClose()
					dispatch(resetAddDiscussionFormFields())
				} catch (err) {
					console.log(err)
				}
			},
		},
		delete: {
			async submit(discussionId: string) {
				await deleteDiscussion({ id: discussionId })
				dispatch(fetchDiscussionList({}))
			},
		},
	}

	const handleUpdateButtonClick = (discussion: Discussion) => {
		dispatch(
			fillUpdateDiscussionFormFields({
				id: discussion.id,
				update: {
					title: discussion.title,
					description: discussion.description,
					startDate: dayjs(new Date(discussion.startDate))
						.format('YYYY-MM-DDTHH:mm')
						.toString(),
					endDate: dayjs(new Date(discussion.endDate)).format(
						'YYYY-MM-DDTHH:mm',
					),
				},
			}),
		)
		disucssionController.update.drawer.onOpen()
	}

	useEffect(() => {
		dispatch(fetchDiscussionList({}))
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
							<Th>Start From</Th>
							<Th>End At</Th>
							<Th textAlign="center">Status</Th>
							<Th textAlign="right">Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{discussion.discussionList.map((discussion) => (
							<Tr key={discussion.id}>
								<Td
									maxWidth="xs"
									overflow="hidden"
									textOverflow="ellipsis"
									whiteSpace="nowrap"
								>
									{discussion.title}
								</Td>
								<Td>
									<div>
										{timeAgo.format(
											new Date(discussion.startDate),
										)}
									</div>
									<div className="text-sm text-gray-500 whitespace-nowrap">
										{dayjs(discussion.startDate)
											.format('D MMM, YYYY hh:MM A')
											.toString()}
									</div>
								</Td>
								<Td>
									<div>
										{timeAgo.format(
											new Date(discussion.endDate),
										)}
									</div>
									<div className="text-sm text-gray-500 whitespace-nowrap">
										{dayjs(discussion.endDate)
											.format('D MMM, YYYY hh:MM A')
											.toString()}
									</div>
								</Td>
								<Td textAlign="center">
									<DiscussionStatus discussion={discussion} />
								</Td>
								<Td textAlign="right">
									<div className="flex items-center justify-end">
										<IconButton
											aria-label="edit"
											icon={<EditIcon />}
											size="sm"
											backgroundColor="yellow.100"
											_hover={{
												backgroundColor: 'yellow.200',
											}}
											color="yellow.600"
											className="shadow mr-2"
											onClick={() => {
												handleUpdateButtonClick(
													discussion,
												)
											}}
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
												disucssionController.delete.submit(
													discussion.id,
												)
											}
										/>
									</div>
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
			<DiscussionUpdateDrawer
				drawer={disucssionController.update.drawer}
				onSubmit={() => disucssionController.update.submit()}
			></DiscussionUpdateDrawer>
		</div>
	)
}

export default DiscussionsPage
