import {
	Box,
	FormLabel,
	Input,
	Select,
	Stack,
	Textarea,
} from '@chakra-ui/react'
import FormDrawer from 'components/drawer/FormDrawer'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { FormDrawerController } from 'types/types'
import { AddDiscussionBody } from './Discussions'

export default function DiscussionAddDrawer({
	controller: { drawer, form, updateFields, onSubmit },
}: {
	controller: FormDrawerController<AddDiscussionBody>
}) {
	const { user } = useSelector((state: RootState) => state)

	const addParticipantToDiscussion = (participantId: string) => {
		const findParticipant = form.fields.participantIds?.find(
			(el) => el === participantId,
		)
		if (findParticipant) return

		updateFields({
			participantIds: [...form.fields.participantIds!, participantId],
		})
	}

	const addViewerToDiscussion = (viewerId: string) => {
		const findViewer = form.fields.viewerIds?.find((el) => el === viewerId)
		if (findViewer) return

		updateFields({
			viewerIds: [...form.fields.viewerIds!, viewerId],
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
								{user.userList
									.filter(
										(el) =>
											!form.fields.participantIds?.find(
												(p) => p === el._id,
											),
									)
									.map((el) => (
										<option value={el._id} key={el._id}>
											{el.name}
										</option>
									))}
							</Select>
							<div>
								{form.fields.participantIds?.map(
									(el, index) => {
										const findUser = user.userList.find(
											(us) => us._id === el,
										)
										return (
											<div key={index}>
												{findUser?.name}
											</div>
										)
									},
								)}
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
								{user.userList
									.filter(
										(el) =>
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
							<div>
								{form.fields.viewerIds?.map((el, index) => {
									const findUser = user.userList.find(
										(us) => us._id === el,
									)
									return (
										<div key={index}>{findUser?.name}</div>
									)
								})}
							</div>
						</Box>
					</div>
				</div>
			</Stack>
		</FormDrawer>
	)
}
