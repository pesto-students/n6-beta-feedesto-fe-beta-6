import { render } from 'utils/testUtils'
import DiscussionsPage from '../Discussions'

describe('<DiscussionsPage />', () => {
	const { getByText } = render(<DiscussionsPage isAdmin={true} />)
	it('should show discussions label', () => {
		const title = getByText('available discussions', {
			exact: false,
		})
		expect(title.textContent).toBe(
			'Here you will see all the available discussions',
		)
	})

	it.todo('should open drawer on click "Add Discussion"')
})
