import React from 'react'
import { Tag, TagLabel } from '@chakra-ui/react'
import { Discussion } from 'store/modules/discussion/discussionSlice'
import dayjs from 'dayjs'

const DiscussionStatus = ({ discussion }: { discussion: Discussion }) => {
	const isCompleted = dayjs(discussion.endDate).isBefore(new Date())
	const isPending = dayjs(discussion.startDate).isAfter(new Date())
	const isLive =
		dayjs(discussion.startDate).isBefore(new Date()) &&
		dayjs(discussion.endDate).isAfter(new Date())

	if (isPending)
		return (
			<Tag appearance="radio" backgroundColor="yellow.100">
				<div className="h-2 w-2 rounded-full bg-yellow-700 mr-1"></div>
				<TagLabel className="text-yellow-700">Pending</TagLabel>
			</Tag>
		)
	if (isCompleted)
		return (
			<Tag appearance="radio" backgroundColor="blue.100">
				<div className="h-2 w-2 rounded-full bg-blue-700 mr-1"></div>
				<TagLabel className="text-blue-700">Completed</TagLabel>
			</Tag>
		)
	if (isLive)
		return (
			<Tag appearance="radio" backgroundColor="green.100">
				<div className="h-2 w-2 rounded-full bg-green-700 mr-1"></div>
				<TagLabel className="text-green-700">Live</TagLabel>
			</Tag>
		)
	return <div></div>
}

export default DiscussionStatus
