import { Box, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import FormDrawer from '../../components/drawer/formDrawer'

export interface UserAddFormProps {
	title: string
	description: string
}
export interface UserAddDrawerProps {
	drawer: {
		isOpen: boolean
		onOpen: () => void
		onClose: () => void
		onToggle: () => void
		isControlled: boolean
		getButtonProps: (props?: any) => any
		getDisclosureProps: (props?: any) => any
	}
	onSubmit: ({ title, description }: UserAddFormProps) => void
}
export default function UserAddDrawer({
	drawer,
	onSubmit,
}: UserAddDrawerProps) {
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
			formId="user-add-drawer"
			title="Add User"
			drawer={drawer}
			onSubmit={handleOnSubmit}
		>
			<Stack spacing="24px">
				<Box>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						id="title"
						placeholder="Please enter user title"
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
