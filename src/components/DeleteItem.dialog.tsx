import {
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from '@chakra-ui/react'
import React from 'react'

const DeleteItemDialog = ({
	title,
	subtitle,
	isOpen,
	cancelRef,
	onCancel,
	onDelete,
}: {
	title: string
	subtitle?: string
	isOpen: boolean
	cancelRef: React.MutableRefObject<null>
	onCancel: () => void
	onDelete: () => void
}) => {
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onCancel}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>
						{subtitle ??
							'Are you sure? You can&apos;t undo this action afterwards.'}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onCancel}>
							Cancel
						</Button>
						<Button colorScheme="red" onClick={onDelete} ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default DeleteItemDialog
