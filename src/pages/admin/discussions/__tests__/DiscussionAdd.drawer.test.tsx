import { Form } from 'services/form'
import { FormDrawerController } from 'types/types'
import { fireEvent, render } from 'utils/testUtils'
import DiscussionAddDrawer, { AddDiscussionBody } from '../DiscussionAdd.drawer'

describe('<DiscussionAddDrawer />', () => {
	const fakeController: FormDrawerController<AddDiscussionBody> = {
		form: new Form({}),
		onSubmit: jest.fn,
		updateFields: jest.fn,
		drawer: {
			isOpen: true,
			onClose: jest.fn,
			onOpen: jest.fn,
			onToggle: jest.fn,
			getButtonProps: jest.fn,
			getDisclosureProps: jest.fn,
			isControlled: false,
		},
	}
	const { getByTestId } = render(
		<DiscussionAddDrawer controller={fakeController} />,
	)
	it('should show title input', () => {
		const titleInput = getByTestId('title-input')

		fireEvent.input(titleInput, {
			target: {
				value: 'New Title Input',
			},
		})

		expect(titleInput.textContent).toBe('')
	})
})
