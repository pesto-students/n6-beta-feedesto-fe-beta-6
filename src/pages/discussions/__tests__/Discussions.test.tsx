import { renderWithRouter } from 'utils/testUtils'
import DiscussionsPage from '../Discussions'
import React from 'react'

describe('<DiscussionsPage />', () => {
	const { getByText } = renderWithRouter(<DiscussionsPage />, {
		route: '/discussions',
	})
	it('should show discussions label', () => {
		const title = getByText('available discussions', {
			exact: false,
		})
		expect(title.textContent).toBe(
			'Here you will see all the available discussions',
		)
	})
})
