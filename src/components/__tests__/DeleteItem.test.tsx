import DeleteItemDialog from 'components/DeleteItem.dialog'
import { render } from 'utils/testUtils'

describe('<DeleteItemDialog />', () => {
	const title = 'Delete Item'
	const { getByText } = render(
		<DeleteItemDialog
			title={title}
			isOpen={true}
			onCancel={() => {}}
			onDelete={() => {}}
		/>,
	)

	it('should show given title', async () => {
		getByText(title)
	})

	it.todo('should show cancel button')

	it.todo('should show delete button')
})
