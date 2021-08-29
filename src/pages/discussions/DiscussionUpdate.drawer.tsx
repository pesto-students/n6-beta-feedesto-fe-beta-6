import {
	Box,
	FormLabel,
	Grid,
	Input,
	Select,
	Stack,
	Textarea,
} from '@chakra-ui/react'
import FormDrawer from 'components/drawer/FormDrawer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { fillUpdateDiscussionFormFields } from 'store/modules/discussion/discussionSlice'
import { User } from 'store/modules/user/userSlice'
import dayjs from 'dayjs'

export interface DiscussionUpdateDrawerProps {
	drawer: {
		isOpen: boolean
		onOpen: () => void
		onClose: () => void
		onToggle: () => void
		isControlled: boolean
		getButtonProps: (props?: any) => any
		getDisclosureProps: (props?: any) => any
	}
	onSubmit: () => void
}
export default function DiscussionUpdateDrawer({
	drawer,
	onSubmit,
}: DiscussionUpdateDrawerProps) {
	const dispatch = useDispatch()
	const { discussion, user } = useSelector((state: RootState) => state)

	return (
		<FormDrawer
			formId="discussion-update-drawer"
			title="Update Discussion"
			drawer={drawer}
			onSubmit={() => onSubmit()}
		>
			<Stack spacing="24px">
				<Box>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						id="title"
						placeholder="Please enter discussion title"
						value={discussion.updateDiscussionForm.update.title}
						onChange={(e) =>
							dispatch(
								fillUpdateDiscussionFormFields({
									update: {
										title: e.target.value,
									},
								}),
							)
						}
					/>
				</Box>

				<Box>
					<FormLabel htmlFor="description">Description</FormLabel>
					<Textarea
						id="description"
						value={
							discussion.updateDiscussionForm.update.description
						}
						onChange={(e) => {
							dispatch(
								fillUpdateDiscussionFormFields({
									update: {
										description: e.target.value,
									},
								}),
							)
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
								value={
									discussion.updateDiscussionForm.update
										.startDate
								}
								onChange={(e) => {
									dispatch(
										fillUpdateDiscussionFormFields({
											update: {
												startDate: e.target.value,
											},
										}),
									)
								}}
							/>
						</Box>
					</div>
					<div className="col-span-1">
						<Box>
							<FormLabel htmlFor="endDate">End Date</FormLabel>
							<Input
								type="datetime-local"
								id="endDate"
								value={
									discussion.updateDiscussionForm.update
										.endDate
								}
								onChange={(e) =>
									dispatch(
										fillUpdateDiscussionFormFields({
											update: {
												endDate: e.target.value,
											},
										}),
									)
								}
							/>
						</Box>
					</div>
				</div>
			</Stack>
		</FormDrawer>
	)
}
