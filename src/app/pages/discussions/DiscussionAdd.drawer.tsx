import { Box, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import FormDrawer from 'app/components/drawer/FormDrawer'
import React, { ChangeEvent, useState } from 'react'

export interface DiscussionAddFormProps {
	title: string
	description: string
}
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
	onSubmit: ({ title, description }: DiscussionAddFormProps) => void
}
export default function DiscussionAddDrawer({
	drawer,
	onSubmit,
}: DiscussionAddDrawerProps) {
	const [title, setTitle] = useState('')
	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value)

	const [description, setDescription] = useState('')
	const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setDescription(e.target.value)

	const handleOnSubmit = () => {
		onSubmit({
			title,
			description,
		})
	}

	return (
		<FormDrawer
			formId="discussion-add-drawer"
			title="Add Discussion"
			drawer={drawer}
			onSubmit={handleOnSubmit}
		>
			<Stack spacing="24px">
				<Box>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						id="title"
						placeholder="Please enter discussion title"
						value={title}
						onChange={handleTitleChange}
					/>
				</Box>

				<Box>
					<FormLabel htmlFor="desc">Description</FormLabel>
					<Textarea
						id="desc"
						value={description}
						onChange={handleDescriptionChange}
					/>
				</Box>
			</Stack>
		</FormDrawer>
	)
}
