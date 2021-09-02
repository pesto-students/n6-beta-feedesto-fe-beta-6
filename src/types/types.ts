import { DrawerDisclosureProps } from 'components/drawer/FormDrawer'
import { Form } from 'services/form'

export type FormDrawerController<T> = {
	drawer?: DrawerDisclosureProps
	form: Form<Partial<T>>
	updateFields: (props: Partial<T>) => void
	load?: (payload?: any) => void
	onSubmit: (payload?: any) => void
}
