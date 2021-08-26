import { renderWithRouter } from '../../../../../utils/test-utils'
import DiscussionsPage from '../Discussions'

describe('<DiscussionsPage />', () => {
	const { getByText } = renderWithRouter(<DiscussionsPage />, {
		route: '/discussions',
	})
	it('should show discussions label', () => {
		const title = getByText('Discussions')
		expect(title.textContent).toBe('Discussions')
	})
})
