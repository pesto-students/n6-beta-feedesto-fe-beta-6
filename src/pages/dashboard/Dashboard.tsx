import {
	Button,
	ButtonGroup,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import TimeAgo from 'javascript-time-ago'
import { Routes } from 'navigation/routes'
import DiscussionStatus from 'pages/admin/discussions/components/DiscussionStatus'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
	Discussion,
	fetchDiscussions,
} from 'store/modules/discussion/discussionSlice'

export enum DiscussionListType {
	PARTICIPANT,
	VIEWER,
}

const DiscussionsPage = () => {
	const timeAgo = new TimeAgo('en-US')
	const history = useHistory()

	const [discussionList, setDiscussionList] = useState<Discussion[]>([])
	const [discussionListType, setDiscussionListType] =
		useState<DiscussionListType>(DiscussionListType.PARTICIPANT)

	const fetchDiscussionListAsParticipant = async () => {
		setDiscussionListType(DiscussionListType.PARTICIPANT)
		setDiscussionList(await fetchDiscussions({ asParticipant: true }))
	}

	const fetchDiscussionListAsViewer = async () => {
		setDiscussionListType(DiscussionListType.VIEWER)
		setDiscussionList(await fetchDiscussions())
	}

	useEffect(() => {
		fetchDiscussionListAsParticipant()
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
			<div className="my-3 text-center">
				<ButtonGroup size="sm" isAttached variant="outline">
					<Button
						onClick={() => fetchDiscussionListAsParticipant()}
						bgColor={
							discussionListType === DiscussionListType.VIEWER
								? 'gray.200'
								: ''
						}
						_hover={{
							bgColor:
								discussionListType ===
								DiscussionListType.PARTICIPANT
									? ''
									: 'gray.100',
						}}
					>
						Participant
					</Button>
					<Button
						onClick={() => fetchDiscussionListAsViewer()}
						bgColor={
							discussionListType ===
							DiscussionListType.PARTICIPANT
								? 'gray.200'
								: ''
						}
						_hover={{
							bgColor:
								discussionListType === DiscussionListType.VIEWER
									? ''
									: 'gray.100',
						}}
					>
						Viewer
					</Button>
				</ButtonGroup>
			</div>
			<div>
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
										Routes.DASHBOARD_DISCUSSION +
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
