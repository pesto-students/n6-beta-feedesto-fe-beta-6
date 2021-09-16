import { ViewIcon } from '@chakra-ui/icons'
import {
	Avatar,
	Button,
	IconButton,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { Routes } from 'navigation/routes'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import {
	fetchDiscussionResultList,
	fetchDiscussions,
} from 'store/modules/discussion/discussionSlice'
import { Discussion, DiscussionResult } from 'types/models/discussion'
import DiscussionStatus, {
	DiscussionStatuses,
	getDiscussionStatus,
} from '../components/DiscussionStatus'

const DiscussionResults = () => {
	const params = useParams<{ id: string }>()
	const history = useHistory<{ id: string }>()
	const discussionId = params.id

	const [discussionDetails, setDiscussionDetails] = useState<Discussion>()
	const [discussionResults, setDiscussionResults] = useState<
		DiscussionResult[]
	>([])

	const fetchDiscussionDetails = async () => {
		const [discussion] = await fetchDiscussions({ _id: discussionId })
		if (discussion) setDiscussionDetails(discussion)
	}

	const fetchDiscussionResults = async () => {
		setDiscussionResults(
			await fetchDiscussionResultList({
				_id: discussionId,
			}),
		)
	}

	useEffect(() => {
		fetchDiscussionDetails()
		fetchDiscussionResults()
	}, [])

	const viewResultAnswers = (result: DiscussionResult) => {
		// Open model here
	}

	const routeToLiveDiscussionView = (discussion: Discussion) => {
		history.push(Routes.DASHBOARD_DISCUSSION + '/' + discussion._id)
	}

	if (!discussionDetails)
		return (
			<div>
				{/* Add Loader here */}
				Loading Details
			</div>
		)
	return (
		<div>
			<div className="flex items-center justify-between px-6 py-3">
				<div>
					<div className="flex items-center">
						<div className="text-3xl text-gray-700 font-semibold">
							{discussionDetails?.title ?? 'Results'}
						</div>
						<div className="ml-2">
							<DiscussionStatus discussion={discussionDetails} />
						</div>
					</div>
					<div className="text-gray-600">
						You can view rankings for this discussion here.
					</div>
				</div>
				{getDiscussionStatus(discussionDetails) ===
				DiscussionStatuses.LIVE ? (
					<div>
						<Button
							colorScheme="green"
							onClick={() =>
								routeToLiveDiscussionView(discussionDetails)
							}
						>
							View Live
						</Button>
					</div>
				) : null}
			</div>
			<div className="border-b-2"></div>
			<div className="mt-3 px-6">
				<div className="font-semibold text-gray-800">Description</div>
				<div>{discussionDetails?.description}</div>
				<div>
					<Table variant="simple">
						{!discussionResults.length && (
							<TableCaption>
								These were all the Discussions
							</TableCaption>
						)}
						<Thead>
							<Tr>
								<Th textAlign="center">Rank</Th>
								<Th>Participant</Th>
								<Th textAlign="center">Upvotes</Th>
								<Th textAlign="center">Downvotes</Th>
								<Th textAlign="center">Score</Th>
								<Th textAlign="right">Actions</Th>
							</Tr>
						</Thead>
						<Tbody>
							{discussionResults.map((result, index) => (
								<Tr
									key={result._id}
									className="hover:bg-gray-100 transition-all duration-200 cursor-pointer"
								>
									<Td
										maxWidth="xs"
										overflow="hidden"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
										onClick={() =>
											viewResultAnswers(result)
										}
									>
										<div className="text-lg font-semibold text-center">
											#{index + 1}
										</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(result)
										}
									>
										<div className="flex items-center">
											<Avatar
												src={
													result.userId
														.googleAvatarUrl
												}
												size="sm"
											/>
											<div className="pl-2">
												{result.userId.name}
											</div>
										</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(result)
										}
										textAlign="center"
									>
										<div>{result.numberOfUpvotes}</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(result)
										}
										textAlign="center"
									>
										<div>{result.numberOfDownvotes}</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(result)
										}
										textAlign="center"
									>
										<div>{result.score}</div>
									</Td>
									<Td textAlign="right">
										<div className="flex items-center justify-end">
											<IconButton
												aria-label="view-dicussion"
												icon={<ViewIcon />}
												size="sm"
												backgroundColor="blue.100"
												_hover={{
													backgroundColor: 'blue.200',
												}}
												color="blue.600"
												className="shadow mr-2"
												onClick={() =>
													viewResultAnswers(result)
												}
											/>
										</div>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</div>
			</div>
		</div>
	)
}

export default DiscussionResults
