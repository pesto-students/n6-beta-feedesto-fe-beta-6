import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export interface FormDrawerProps {
	formId: string
	title: string
	drawer: {
		isOpen: boolean
		onOpen: () => void
		onClose: () => void
		onToggle: () => void
		isControlled: boolean
		getButtonProps: (props?: any) => any
		getDisclosureProps: (props?: any) => any
	}
	onSubmit: Function
}

const FormDrawer: FunctionComponent<FormDrawerProps> = ({
	title,
	drawer,
	onSubmit,
	formId,
	children,
}) => {
	return (
		<>
			<Drawer
				isOpen={drawer.isOpen}
				placement="right"
				onClose={drawer.onClose}
				size="lg"
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

					<DrawerBody>
						<form
							id={formId}
							autoComplete="off"
							onSubmit={(e) => {
								e.preventDefault()
								if (onSubmit) onSubmit()
							}}
						>
							{children}
						</form>
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Button
							variant="outline"
							mr={3}
							onClick={drawer.onClose}
						>
							Cancel
						</Button>
						<Button colorScheme="blue" type="submit" form={formId}>
							Submit
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default FormDrawer
