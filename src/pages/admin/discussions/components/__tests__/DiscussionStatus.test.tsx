import dayjs from 'dayjs'
import { cleanup, render } from 'utils/testUtils'
import { generateDiscussions } from '__mocks__/resources/discussion'
import DiscussionStatus from '../DiscussionStatus'

describe('<DiscussionStatus />', () => {
	const discussions = generateDiscussions(10)
	const now = new Date()
	let findLabel: HTMLElement

	for (let i = 0; i < discussions.length; i++) {
		const discussion = discussions[i]
		it('should show Appropriate label', async () => {
			const { findByTestId } = render(
				<DiscussionStatus discussion={discussion} />,
			)

			findLabel = await findByTestId('label')

			if (dayjs(discussion.endDate).isBefore(now)) {
				expect(findLabel.textContent).toBe('Completed')
			} else if (dayjs(discussion.startDate).isAfter(now)) {
				expect(findLabel.textContent).toBe('Upcoming')
			} else {
				expect(findLabel.textContent).toBe('Live')
			}
		})
	}
	afterEach(() => {
		cleanup()
	})
})