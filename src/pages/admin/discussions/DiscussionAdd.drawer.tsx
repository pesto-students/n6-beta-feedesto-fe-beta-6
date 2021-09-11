import { CloseIcon } from '@chakra-ui/icons'
import {
	Box,
	FormLabel,
	IconButton,
	Input,
	Select,
	Stack,
	Table,
	Tbody,
	Td,
	Textarea,
	Tr,
} from '@chakra-ui/react'
import FormDrawer from 'components/drawer/FormDrawer'
import { useEffect, useState } from 'react'
import { copyObject } from 'services/form'
import { fetchUsers, User } from 'store/modules/user/userSlice'
import { FormDrawerController } from 'types/types'
import { AddDiscussionBody } from './Discussions'

export default function DiscussionAddDrawer({
	controller: { drawer, form, updateFields, onSubmit },
}: {
	controller: FormDrawerController<AddDiscussionBody>
}) {
	const [userList, setUserList] = useState<User[]>([])
	const fetchUserList = async () => {
		setUserList(await fetchUsers())
	}
	useEffect(() => {
		fetchUserList()
	}, [])

	const addParticipantToDiscussion = (participantId: string) => {
		const findParticipant = form.fields.participantIds?.find(
			(el) => el === participantId,
		)
		if (findParticipant) return

		updateFields({
			participantIds: [...form.fields.participantIds!, participantId],
		})
	}

	const removeParticipantFromDiscussion = (participantId: string) => {
		const findParticipantIndex = form.fields.participantIds?.findIndex(
			(el) => el === participantId,
		)
		if (findParticipantIndex === undefined) return

		const tempParticipantIds: string[] = copyObject(
			form.fields.participantIds ?? [],
		)
		tempParticipantIds.splice(findParticipantIndex, 1)

		updateFields({
			participantIds: tempParticipantIds,
		})
	}

	const addViewerToDiscussion = (viewerId: string) => {
		const findViewer = form.fields.viewerIds?.find((el) => el === viewerId)
		if (findViewer) return

		updateFields({
			viewerIds: [...form.fields.viewerIds!, viewerId],
		})
	}

	const removeViewerFromDiscussion = (viewerId: string) => {
		const findViewerIndex = form.fields.viewerIds?.findIndex(
			(el) => el === viewerId,
		)
		if (findViewerIndex === undefined) return

		const tempViewerIds: string[] = copyObject(form.fields.viewerIds ?? [])
		tempViewerIds.splice(findViewerIndex, 1)

		updateFields({
			viewerIds: tempViewerIds,
		})
	}

	return (
		<FormDrawer
			formId="discussion-add-drawer"
			title="Add Discussion"
			drawer={drawer!}
			form={form}
			onSubmit={() => onSubmit()}
		>
			<Stack spacing="24px">
				<Box>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						id="title"
						placeholder="Please enter discussion title"
						value={form.fields.title}
						onChange={(e) => {
							updateFields({
								title: e.target.value,
							})
						}}
					/>
				</Box>

				<Box>
					<FormLabel htmlFor="description">Description</FormLabel>
					<Textarea
						id="description"
						value={form.fields.description}
						onChange={(e) => {
							updateFields({
								description: e.target.value,
							})
						}}
					/>
				</Box>
				<div className="grid grid-cols-2 gap-x-5">
					<div className="col-span-1">
						<Box>
							<FormLabel htmlFor="startDate">
								Start Date
							</FormLabel>
							<Input
								type="datetime-local"
								id="startDate"
								value={form.fields.startDate}
								onChange={(e) =>
									updateFields({
										startDate: e.target.value,
									})
								}
							/>
						</Box>
					</div>
					<div className="col-span-1">
						<Box>
							<FormLabel htmlFor="endDate">End Date</FormLabel>
							<Input
								type="datetime-local"
								id="endDate"
								value={form.fields.endDate}
								onChange={(e) =>
									updateFields({
										endDate: e.target.value,
									})
								}
							/>
						</Box>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-5">
					<div className="col-span-1">
						<Box>
							<FormLabel htmlFor="participantIds">
								Participants
							</FormLabel>
							<Select
								id="participantIds"
								placeholder="Select option"
								background="white"
								onChange={(e) => {
									addParticipantToDiscussion(e.target.value)
								}}
							>
								{userList
									.filter(
										(el) =>
											!form.fields.participantIds?.find(
												(p) => p === el._id,
											) &&
											!form.fields.viewerIds?.find(
												(p) => p === el._id,
											),
									)
									.map((el) => (
										<option value={el._id} key={el._id}>
											{el.name}
										</option>
									))}
							</Select>
							<div className="rounded-b-lg bg-gray-50 overflow-hidden">
								<Table variant="striped" size="sm">
									<Tbody>
										{form.fields.participantIds?.map(
											(el, index) => {
												const findUser = userList.find(
													(us) => us._id === el,
												)
												if (!findUser) return null
												return (
													<Tr key={index}>
														<Td padding="1">
															<div className="flex items-center justify-between pl-2 pr-1 py-1">
																{findUser?.name}
																<IconButton
																	aria-label="remove-participant"
																	icon={
																		<CloseIcon />
																	}
																	size="xs"
																	backgroundColor="gray.100"
																	color="gray.700"
																	className="shadow"
																	onClick={() =>
																		removeParticipantFromDiscussion(
																			findUser._id,
																		)
																	}
																/>
															</div>
														</Td>
													</Tr>
												)
											},
										)}
									</Tbody>
								</Table>
							</div>
						</Box>
					</div>
					<div className="col-span-1">
						<Box>
							<FormLabel htmlFor="viewerIds">Viewers</FormLabel>
							<Select
								id="viewerIds"
								placeholder="Select option"
								background="white"
								onChange={(e) => {
									addViewerToDiscussion(e.target.value)
									e.target.value = ''
								}}
							>
								{userList
									.filter(
										(el) =>
											!form.fields.participantIds?.find(
												(p) => p === el._id,
											) &&
											!form.fields.viewerIds?.find(
												(p) => p === el._id,
											),
									)
									.map((el) => (
										<option value={el._id} key={el._id}>
											{el.name}
										</option>
									))}
							</Select>
							<div className="rounded-b-lg bg-gray-50 overflow-hidden">
								<Table variant="striped" size="sm">
									<Tbody>
										{form.fields.viewerIds?.map(
											(el, index) => {
												const findUser = userList.find(
													(us) => us._id === el,
												)
												if (!findUser) return null
												return (
													<Tr key={index}>
														<Td padding="1">
															<div className="flex items-center justify-between pl-2 pr-1 py-1">
																{findUser?.name}
																<IconButton
																	aria-label="remove-participant"
																	icon={
																		<CloseIcon />
																	}
																	size="xs"
																	backgroundColor="gray.100"
																	color="gray.700"
																	className="shadow"
																	onClick={() =>
																		removeViewerFromDiscussion(
																			findUser._id,
																		)
																	}
																/>
															</div>
														</Td>
													</Tr>
												)
											},
										)}
									</Tbody>
								</Table>
							</div>
						</Box>
					</div>
				</div>
			</Stack>
		</FormDrawer>
	)
}
