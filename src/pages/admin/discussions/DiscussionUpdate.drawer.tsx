import { Box, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import FormDrawer from 'components/drawer/FormDrawer'
import React from 'react'
import { FormDrawerController } from 'types/types'
import { UpdateDiscussionBody } from './Discussions'

export default function DiscussionUpdateDrawer({
	controller: { drawer, form, updateFields, onSubmit },
}: {
	controller: FormDrawerController<UpdateDiscussionBody>
}) {
	return (
		<FormDrawer
			formId="discussion-update-drawer"
			title="Update Discussion"
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
						value={form.fields.update?.title}
						onChange={(e) =>
							updateFields({
								update: {
									title: e.target.value,
								},
							})
						}
					/>
				</Box>

				<Box>
					<FormLabel htmlFor="description">Description</FormLabel>
					<Textarea
						id="description"
						value={form.fields.update?.description}
						onChange={(e) => {
							updateFields({
								update: {
									description: e.target.value,
								},
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
								value={form.fields.update?.startDate}
								onChange={(e) => {
									updateFields({
										update: {
											startDate: e.target.value,
										},
									})
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
								value={form.fields.update?.endDate}
								onChange={(e) =>
									updateFields({
										update: {
											endDate: e.target.value,
										},
									})
								}
							/>
						</Box>
					</div>
				</div>
			</Stack>
		</FormDrawer>
	)
}
