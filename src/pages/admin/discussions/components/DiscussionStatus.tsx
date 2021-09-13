import { Tag, TagLabel } from '@chakra-ui/react'
import { Discussion } from 'store/modules/discussion/discussionSlice'
import dayjs from 'dayjs'

export enum DiscussionStatuses {
	PENDING,
	LIVE,
	COMPLETED,
}

export const getDiscussionStatus = (
	discussion: Discussion,
): DiscussionStatuses => {
	const now = new Date()
	if (dayjs(discussion.endDate).isBefore(now)) {
		return DiscussionStatuses.COMPLETED
	}
	if (dayjs(discussion.startDate).isAfter(now)) {
		return DiscussionStatuses.PENDING
	}
	if (
		dayjs(discussion.startDate).isBefore(now) &&
		dayjs(discussion.endDate).isAfter(now)
	) {
		return DiscussionStatuses.LIVE
	}

	return DiscussionStatuses.PENDING
}

const DiscussionStatus = ({ discussion }: { discussion: Discussion }) => {
	const status = getDiscussionStatus(discussion)

	if (status === DiscussionStatuses.PENDING)
		return (
			<Tag
				appearance="radio"
				backgroundColor="yellow.100"
				title="Upcoming"
			>
				<div className="h-2 w-2 rounded-full bg-yellow-700 mr-1"></div>
				<TagLabel className="text-yellow-700">Upcoming</TagLabel>
			</Tag>
		)
	if (status === DiscussionStatuses.COMPLETED)
		return (
			<Tag
				appearance="radio"
				backgroundColor="blue.100"
				title="Completed"
			>
				<div className="h-2 w-2 rounded-full bg-blue-700 mr-1"></div>
				<TagLabel className="text-blue-700">Completed</TagLabel>
			</Tag>
		)
	if (status === DiscussionStatuses.LIVE)
		return (
			<Tag appearance="radio" backgroundColor="green.100" title="Live">
				<div className="h-2 w-2 rounded-full bg-green-700 mr-1"></div>
				<TagLabel className="text-green-700">Live</TagLabel>
			</Tag>
		)
	return null
}

export default DiscussionStatus
