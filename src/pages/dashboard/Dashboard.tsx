import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'
import TimeAgo from 'javascript-time-ago'
import { DASHBOARD_DISCUSSION } from 'navigation/routes'
import DiscussionStatus from 'pages/admin/discussions/components/DiscussionStatus'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store'
import {
	Discussion,
	fetchDiscussions,
} from 'store/modules/discussion/discussionSlice'

const DiscussionsPage = () => {
	const dispatch = useDispatch()
	const timeAgo = new TimeAgo('en-US')
	const history = useHistory()

	const [discussionList, setDiscussionList] = useState<Discussion[]>([])
	const fetchDiscussionList = async () => {
		setDiscussionList(await fetchDiscussions({ asParticipant: true }))
	}

	useEffect(() => {
		fetchDiscussionList()
	}, [])

	return (
		<div>
			<div className="flex items-center justify-between px-6 py-3">
				<div>
					<div className="text-3xl text-gray-700 font-semibold">
						Discussions
					</div>
					<div className="text-gray-600">
						Here you will see all the available discussions
					</div>
				</div>
			</div>
			<div className="border-b-2"></div>
			<div className="mt-3">
				<Table variant="simple">
					{!discussionList.length && (
						<TableCaption>
							These were all the Discussions
						</TableCaption>
					)}
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Start From</Th>
							<Th>End At</Th>
							<Th textAlign="center">Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{discussionList.map((discussion) => (
							<Tr
								key={discussion._id}
								onClick={() => {
									history.push(
										DASHBOARD_DISCUSSION +
											'/' +
											discussion._id,
									)
								}}
								className="hover:bg-gray-100 transition-all duration-200 cursor-pointer"
							>
								<Td
									maxWidth="xs"
									overflow="hidden"
									textOverflow="ellipsis"
									whiteSpace="nowrap"
								>
									{discussion.title}
								</Td>
								<Td>
									<div>
										{timeAgo.format(
											new Date(discussion.startDate),
										)}
									</div>
									<div className="text-sm text-gray-500 whitespace-nowrap">
										{dayjs(discussion.startDate)
											.format('D MMM, YYYY hh:MM A')
											.toString()}
									</div>
								</Td>
								<Td>
									<div>
										{timeAgo.format(
											new Date(discussion.endDate),
										)}
									</div>
									<div className="text-sm text-gray-500 whitespace-nowrap">
										{dayjs(discussion.endDate)
											.format('D MMM, YYYY hh:MM A')
											.toString()}
									</div>
								</Td>
								<Td textAlign="center">
									<DiscussionStatus discussion={discussion} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
		</div>
	)
}

export default DiscussionsPage
