import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
	Avatar,
	AvatarGroup,
	Button,
	ButtonGroup,
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
import DeleteItemDialog from 'components/DeleteItem.dialog'
import dayjs from 'dayjs'
import TimeAgo from 'javascript-time-ago'
import { Routes } from 'navigation/routes'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Form } from 'services/form'
import { fetchDiscussions } from 'store/modules/discussion/discussionSlice'
import { DiscussionListType } from 'types/enums'
import { FormDrawerController } from 'types/types'
import { Discussion } from 'types/models/discussion'
import DiscussionStatus from './components/DiscussionStatus'
import DiscussionAddDrawer, { AddDiscussionBody } from './DiscussionAdd.drawer'
import DiscussionUpdateDrawer, {
	UpdateDiscussionBody,
} from './DiscussionUpdate.drawer'

export interface DeleteDiscussionBody {
	_id: string
}

const DiscussionsPage: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
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
	const [isDeleteDiscussionDialogOpen, setIsDeleteDiscussionDialogOpen] =
		useState(false)
	const onDeleteDiscussionDialogClose = () =>
		setIsDeleteDiscussionDialogOpen(false)
	const deleteDiscussionDialogCancelRef = useRef(null)

	const [discussionList, setDiscussionList] = useState<Discussion[]>([])
	const fetchDiscussionList = async () => {
		const discussions = await fetchDiscussions()
		setDiscussionList(discussions)
	}

	const [discussionListType, setDiscussionListType] =
		useState<DiscussionListType>(DiscussionListType.PARTICIPANT)

	const fetchDiscussionListAsParticipant = async () => {
		setDiscussionListType(DiscussionListType.PARTICIPANT)
		setDiscussionList(await fetchDiscussions({ asParticipant: true }))
	}

	const fetchDiscussionListAsViewer = async () => {
		setDiscussionListType(DiscussionListType.VIEWER)
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
			updateFields: (props) => {
				setAddDiscussionFormFields({
					...addDiscussionFormFields,
					...props,
				})
				discussionController.add.form.fields = {
					...addDiscussionFormFields,
					...props,
				}
			},
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
			updateFields: (props) => {
				setUpdateDiscussionFormFields({
					...updateDiscussionFormFields,
					...props,
					update: {
						...updateDiscussionFormFields.update,
						...props.update,
					},
				})
				discussionController.update.form.fields = {
					...updateDiscussionFormFields,
					...props,
					update: {
						...updateDiscussionFormFields.update,
						...props.update,
					},
				}
			},
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
			updateFields: (props) => {
				setDeleteDiscussionFormFields({
					...deleteDiscussionFormFields,
					...props,
				})
				discussionController.delete.form.fields = {
					...deleteDiscussionFormFields,
					...props,
				}
			},
			async onSubmit() {
				await discussionController.delete.form.submit('discussion', {
					method: 'DELETE',
				})
				await fetchDiscussionList()
			},
		},
	}

	const routeToDiscussionView = (discussion: Discussion) => {
		if (isAdmin) {
			history.push(Routes.ADMIN_DISCUSSION_RESULTS + '/' + discussion._id)
		} else {
			history.push(Routes.DISCUSSION_VIEW + '/' + discussion._id)
		}
	}
	if (isAdmin) {
		useEffect(() => {
			fetchDiscussionList()
		}, [])
	} else {
		useEffect(() => {
			fetchDiscussionListAsParticipant()
		}, [])
	}

	const [didMount, setDidMount] = useState(false)

	useEffect(() => {
		setDidMount(true)
		return () => setDidMount(false)
	}, [])

	if (!didMount) {
		return null
	}

	const ViewerParticipantSwitch: React.FC = () => {
		return (
			<div className="my-3 text-center">
				<ButtonGroup size="sm" isAttached variant="outline">
					<Button
						onClick={() => fetchDiscussionListAsParticipant()}
						bgColor={
							discussionListType === DiscussionListType.VIEWER
								? 'gray.200'
								: ''
						}
						_hover={{
							bgColor:
								discussionListType ===
								DiscussionListType.PARTICIPANT
									? ''
									: 'gray.100',
						}}
					>
						Participant
					</Button>
					<Button
						onClick={() => fetchDiscussionListAsViewer()}
						bgColor={
							discussionListType ===
							DiscussionListType.PARTICIPANT
								? 'gray.200'
								: ''
						}
						_hover={{
							bgColor:
								discussionListType === DiscussionListType.VIEWER
									? ''
									: 'gray.100',
						}}
					>
						Viewer
					</Button>
				</ButtonGroup>
			</div>
		)
	}

	const administrativeDialogs = (
		<>
			<DiscussionAddDrawer
				controller={discussionController.add}
			></DiscussionAddDrawer>
			<DiscussionUpdateDrawer
				controller={discussionController.update}
			></DiscussionUpdateDrawer>
			<DeleteItemDialog
				title="Delete Discussion"
				isOpen={isDeleteDiscussionDialogOpen}
				cancelRef={deleteDiscussionDialogCancelRef}
				onCancel={onDeleteDiscussionDialogClose}
				onDelete={() => {
					onDeleteDiscussionDialogClose()
					discussionController.delete.onSubmit()
				}}
			/>
		</>
	)

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
				{isAdmin && (
					<div>
						<Button
							leftIcon={<AddIcon />}
							colorScheme="teal"
							onClick={discussionController.add.drawer?.onOpen}
						>
							Add Discussion
						</Button>
					</div>
				)}
			</div>
			<div className="border-b-2"></div>
			{!isAdmin ? <ViewerParticipantSwitch /> : null}
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
							<Th>Status</Th>
							{isAdmin && (
								<>
									<Th>Participants</Th>
									<Th textAlign="right">Actions</Th>
								</>
							)}
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
										routeToDiscussionView(discussion)
									}
								>
									{discussion.title}
								</Td>
								<Td
									onClick={() =>
										routeToDiscussionView(discussion)
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
										routeToDiscussionView(discussion)
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
										routeToDiscussionView(discussion)
									}
									textAlign="start"
								>
									<DiscussionStatus discussion={discussion} />
								</Td>

								{isAdmin && (
									<>
										<Td>
											<AvatarGroup
												size="sm"
												max={2}
												fontSize="sm"
												spacing="-2"
											>
												{discussion.participants?.map(
													(participant, index) => (
														<Avatar
															name={
																participant.name
															}
															src={
																participant.googleAvatarUrl
															}
															key={index}
														></Avatar>
													),
												)}
											</AvatarGroup>
										</Td>
										<Td textAlign="right">
											<div className="flex items-center justify-end">
												<IconButton
													aria-label="edit"
													icon={<EditIcon />}
													size="sm"
													backgroundColor="yellow.100"
													_hover={{
														backgroundColor:
															'yellow.200',
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
														backgroundColor:
															'red.200',
													}}
													color="red.600"
													className="shadow"
													onClick={() => {
														discussionController.delete.updateFields(
															{
																_id: discussion._id,
															},
														)
														setIsDeleteDiscussionDialogOpen(
															true,
														)
													}}
												/>
											</div>
										</Td>
									</>
								)}
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
			{isAdmin ? administrativeDialogs : null}
		</div>
	)
}

export default DiscussionsPage
