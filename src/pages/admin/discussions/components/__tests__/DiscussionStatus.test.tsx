import dayjs from 'dayjs'
import { cleanup, render } from 'utils/testUtils'
import { generateDiscussions } from 'types/models/discussion'
import DiscussionStatus from '../DiscussionStatus'

describe('<DiscussionStatus />', () => {
	const discussions = generateDiscussions(10)
	const now = new Date()

	for (let i = 0; i < discussions.length; i++) {
		const discussion = discussions[i]
		it('should show Appropriate label', async () => {
			const { getByText } = render(
				<DiscussionStatus discussion={discussion} />,
			)

			if (dayjs(discussion.endDate).isBefore(now)) {
				getByText('Completed')
			} else if (dayjs(discussion.startDate).isAfter(now)) {
				getByText('Upcoming')
			} else {
				getByText('Live')
			}
		})
	}
	afterEach(() => {
		cleanup()
	})
})
