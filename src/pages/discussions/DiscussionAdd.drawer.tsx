import { Box, FormLabel, Grid, Input, Stack, Textarea } from '@chakra-ui/react'
import FormDrawer from 'components/drawer/FormDrawer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { fillAddDiscussionFormFields } from 'store/modules/discussion/discussionSlice'

export interface DiscussionAddDrawerProps {
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
export default function DiscussionAddDrawer({
	drawer,
	onSubmit,
}: DiscussionAddDrawerProps) {
	const dispatch = useDispatch()
	const { discussion, user } = useSelector((state: RootState) => state)

	return (
		<FormDrawer
			formId="discussion-add-drawer"
			title="Add Discussion"
			drawer={drawer}
			onSubmit={() => onSubmit()}
		>
			<Stack spacing="24px">
				<Box>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						id="title"
						placeholder="Please enter discussion title"
						value={discussion.addDiscussionForm.title}
						onChange={(e) =>
							dispatch(
								fillAddDiscussionFormFields({
									title: e.target.value,
								}),
							)
						}
					/>
				</Box>

				<Box>
					<FormLabel htmlFor="description">Description</FormLabel>
					<Textarea
						id="description"
						value={discussion.addDiscussionForm.description}
						onChange={(e) => {
							dispatch(
								fillAddDiscussionFormFields({
									description: e.target.value,
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
								value={discussion.addDiscussionForm.startDate}
								onChange={(e) =>
									dispatch(
										fillAddDiscussionFormFields({
											startDate: e.target.value,
										}),
									)
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
								value={discussion.addDiscussionForm.endDate}
								onChange={(e) =>
									dispatch(
										fillAddDiscussionFormFields({
											endDate: e.target.value,
										}),
									)
								}
							/>
						</Box>
					</div>
					{/* <Box>
						<FormLabel htmlFor="participantIds">End Date</FormLabel>
						<Input
							type="datetime-local"
							id="endDate"
							value={discussion.addDiscussionForm.endDate}
							onChange={(e) =>
								dispatch(
									fillAddDiscussionFormFields({
										endDate: e.target.value,
									}),
								)
							}
						/>
					</Box> */}
				</div>
			</Stack>
		</FormDrawer>
	)
}
