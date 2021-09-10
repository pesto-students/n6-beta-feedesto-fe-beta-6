import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
import dayjs from 'dayjs'
import TimeAgo from 'javascript-time-ago'
import { Routes } from 'navigation/routes'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Form } from 'services/form'
import { RootState } from 'store'
import {
	Discussion,
	fetchDiscussions,
} from 'store/modules/discussion/discussionSlice'
import { FormDrawerController } from 'types/types'
import DiscussionStatus from './components/DiscussionStatus'
import DiscussionAddDrawer from './DiscussionAdd.drawer'
import DiscussionUpdateDrawer from './DiscussionUpdate.drawer'

export interface AddDiscussionBody {
	title: string
	description: string
	startDate: string
	endDate: string
	participantIds: string[]
	viewerIds: string[]
}

export interface UpdateDiscussionBody {
	_id: string
	update: {
		title?: string
		description?: string
		startDate?: string
		endDate?: string
	}
}

export interface DeleteDiscussionBody {
	_id: string
}

const DiscussionsPage = () => {
	const timeAgo = new TimeAgo('en-US')
	const history = useHistory()

	const addDiscussionFormFieldsInitial = {
		title: '',
		description: '',
		startDate: dayjs().format('YYYY-MM-DDTHH:mm').toString(),
		endDate: dayjs().format('YYYY-MM-DDTHH:mm').toString(),
		participantIds: [],
		viewerIds: [],
	}
	const discussionAddDrawer = useDisclosure()
	const [addDiscussionFormFields, setAddDiscussionFormFields] = useState<
		Partial<AddDiscussionBody>
	>(addDiscussionFormFieldsInitial)

	const updateDiscussionFormFieldsInitial = {
		_id: '',
		update: {
			title: '',
			description: '',
			startDate: '',
			endDate: '',
		},
	}
	const discussionUpdateDrawer = useDisclosure()
	const [updateDiscussionFormFields, setUpdateDiscussionFormFields] =
		useState<Partial<UpdateDiscussionBody>>(
			updateDiscussionFormFieldsInitial,
		)

	const deleteDiscussionFormFieldsInitial = {
		_id: '',
	}
	const [deleteDiscussionFormFields, setDeleteDiscussionFormFields] =
		useState<Partial<DeleteDiscussionBody>>(
			deleteDiscussionFormFieldsInitial,
		)

	const [discussionList, setDiscussionList] = useState<Discussion[]>([])
	const fetchDiscussionList = async () => {
		setDiscussionList(await fetchDiscussions())
	}

	const discussionController: {
		add: FormDrawerController<AddDiscussionBody>
		update: FormDrawerController<UpdateDiscussionBody>
		delete: FormDrawerController<DeleteDiscussionBody>
	} = {
		add: {
			drawer: discussionAddDrawer,
			form: new Form(addDiscussionFormFields),
			updateFields: (props) =>
				setAddDiscussionFormFields({
					...addDiscussionFormFields,
					...props,
				}),
			async onSubmit() {
				try {
					await discussionController.add.form.submit('discussion', {
						method: 'POST',
					})
					await fetchDiscussionList()
					discussionAddDrawer.onClose()
					setAddDiscussionFormFields(addDiscussionFormFieldsInitial)
				} catch (err) {
					console.log(err)
				}
			},
		},
		update: {
			drawer: discussionUpdateDrawer,
			form: new Form(updateDiscussionFormFields),
			updateFields: (props) =>
				setUpdateDiscussionFormFields({
					...updateDiscussionFormFields,
					...props,
					update: {
						...updateDiscussionFormFields.update,
						...props.update,
					},
				}),
			load: (discussion: Discussion) => {
				discussionController.update.updateFields({
					_id: discussion._id,
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
				})
				discussionController.update.drawer?.onOpen()
			},
			async onSubmit() {
				try {
					await discussionController.update.form.submit(
						'discussion',
						{
							method: 'PUT',
						},
					)
					await fetchDiscussionList()
					discussionUpdateDrawer.onClose()
					setUpdateDiscussionFormFields(
						updateDiscussionFormFieldsInitial,
					)
				} catch (err) {
					console.log(err)
				}
			},
		},
		delete: {
			form: new Form(deleteDiscussionFormFields),
			updateFields: (props) =>
				setDeleteDiscussionFormFields({
					...deleteDiscussionFormFields,
					...props,
				}),
			async onSubmit(discussionId: string) {
				discussionController.delete.form.fields._id = discussionId
				await discussionController.delete.form.submit('discussion', {
					method: 'DELETE',
				})
				await fetchDiscussionList()
			},
		},
	}

	const routeToDiscussionView = (discussionId: string) => {
		history.push(Routes.DASHBOARD_DISCUSSION + '/' + discussionId)
	}

	useEffect(() => {
		fetchDiscussionList()
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
						onClick={discussionController.add.drawer?.onOpen}
					>
						Add Discussion
					</Button>
				</div>
			</div>
			<div className="border-b-2"></div>
			<div className="mt-3">
				<Table variant="simple">
					{!discussionList.length && (
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
						{discussionList.map((discussion) => (
							<Tr
								key={discussion._id}
								className="hover:bg-gray-100 transition-all duration-200 cursor-pointer"
							>
								<Td
									maxWidth="xs"
									overflow="hidden"
									textOverflow="ellipsis"
									whiteSpace="nowrap"
									onClick={() =>
										routeToDiscussionView(discussion._id)
									}
								>
									{discussion.title}
								</Td>
								<Td
									onClick={() =>
										routeToDiscussionView(discussion._id)
									}
								>
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
								<Td
									onClick={() =>
										routeToDiscussionView(discussion._id)
									}
								>
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
								<Td
									onClick={() =>
										routeToDiscussionView(discussion._id)
									}
									textAlign="center"
								>
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
												discussionController.update.load?.(
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
												discussionController.delete.onSubmit(
													discussion._id,
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
				controller={discussionController.add}
			></DiscussionAddDrawer>
			<DiscussionUpdateDrawer
				controller={discussionController.update}
			></DiscussionUpdateDrawer>
		</div>
	)
}

export default DiscussionsPage
