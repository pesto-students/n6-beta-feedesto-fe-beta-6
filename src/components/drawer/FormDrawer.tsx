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
import { Form } from 'services/form'

export interface DrawerDisclosureProps {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
	isControlled: boolean
	getButtonProps: (props?: any) => any
	getDisclosureProps: (props?: any) => any
}
export interface FormDrawerProps {
	formId: string
	form: Form<any>
	drawer: DrawerDisclosureProps
	onSubmit: Function
	title: string
}

const FormDrawer: FunctionComponent<FormDrawerProps> = ({
	title,
	drawer,
	onSubmit,
	formId,
	children,
	form,
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
						<Button
							colorScheme="blue"
							type="submit"
							form={formId}
							isLoading={form.submitting}
							disabled={form.submitting}
						>
							Submit
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default FormDrawer
