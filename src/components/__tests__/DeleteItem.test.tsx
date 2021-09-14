import DeleteItemDialog from 'components/DeleteItem.dialog'
import { render } from 'utils/testUtils'

describe('<DeleteItemDialog />', () => {
	const title = 'Delete Item'
	const { findByTestId } = render(
		<DeleteItemDialog
			title={title}
			isOpen={true}
			onCancel={() => {}}
			onDelete={() => {}}
		/>,
	)

	it('should show given title', async () => {
		const findTitle = await findByTestId('title')
		expect(findTitle.textContent).toBe(title)
	})

	it.todo('should show cancel button')

	it.todo('should show delete button')
})
