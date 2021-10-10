import { ViewIcon } from '@chakra-ui/icons'
import {
	Avatar,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Table,
	TableCaption,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react'
import * as Icons from 'react-bootstrap-icons'
import classNames from 'classnames'
import dayjs from 'dayjs'
import TimeAgo from 'javascript-time-ago'
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
	const timeAgo = new TimeAgo('en-US')

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

	const resultAnswerDrawer = useDisclosure()
	const [selectedResult, setSelectedResult] = useState<DiscussionResult>()

	const viewResultAnswers = (result: DiscussionResult) => {
		setSelectedResult(result)
		resultAnswerDrawer.onOpen()
	}

	const routeToLiveDiscussionView = (discussion: Discussion) => {
		history.push(Routes.DISCUSSION_VIEW + '/' + discussion._id)
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
				<div className="font-semibold text-gray-800 text-xl mt-6">
					Results
				</div>
				<div className="mt-2">
					<Table variant="simple">
						{!discussionResults.length && (
							<TableCaption>No Results found !</TableCaption>
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
							{discussionResults.map((resultUser, index) => (
								<Tr
									key={resultUser._id}
									className="hover:bg-gray-100 transition-all duration-200 cursor-pointer"
								>
									<Td
										maxWidth="xs"
										overflow="hidden"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
										onClick={() =>
											viewResultAnswers(resultUser)
										}
									>
										<div className="text-lg font-semibold text-center">
											#{index + 1}
										</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(resultUser)
										}
									>
										<div className="flex items-center">
											<Avatar
												src={resultUser.googleAvatarUrl}
												size="sm"
											/>
											<div className="pl-2">
												{resultUser.name}
											</div>
										</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(resultUser)
										}
										textAlign="center"
									>
										<div>{resultUser.numberOfUpvotes}</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(resultUser)
										}
										textAlign="center"
									>
										<div>
											{resultUser.numberOfDownvotes}
										</div>
									</Td>
									<Td
										onClick={() =>
											viewResultAnswers(resultUser)
										}
										textAlign="center"
									>
										<div>{resultUser.score}</div>
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
													viewResultAnswers(
														resultUser,
													)
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
			<Drawer {...resultAnswerDrawer} size="lg">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">
						Result Answers -{' '}
						{selectedResult?.answers[0]?.user?.name}
					</DrawerHeader>
					<DrawerBody>
						{selectedResult?.answers.length ? (
							<>
								<div className="text-lg font-semibold">
									Answers
								</div>
								{selectedResult?.answers.map(
									(answer, index) => (
										<div key={index} className="my-4">
											<div className="flex">
												<div className="flex-none">
													<div className="flex flex-col items-center text-gray-500">
														<div>
															<Icons.CaretUp
																size={26}
															/>
														</div>
														<div className="font-bold">
															{answer.upvoters!
																.length -
																answer.downvoters!
																	.length}
														</div>
														<div>
															<Icons.CaretDown
																size={26}
															/>
														</div>
													</div>
												</div>
												<div className="flex-1">
													<div className="relative">
														<div
															className={classNames(
																'ml-2 px-5 py-4 rounded-2xl rounded-tl-md bg-gray-700 text-gray-200',
															)}
														>
															{answer.content}
														</div>
														<div
															className={classNames(
																'absolute bottom-1 right-3 text-xs text-gray-300',
															)}
														>
															{timeAgo.format(
																dayjs(
																	new Date(
																		answer.createdAt,
																	),
																).toDate(),
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									),
								)}
							</>
						) : null}
						{selectedResult?.comments.length ? (
							<>
								<div className="text-lg font-semibold">
									Comments
								</div>
								{selectedResult?.comments.map(
									(comment, index) => (
										<div key={index} className="my-4">
											<div className="flex">
												<div className="flex-none">
													<div className="flex flex-col items-center text-gray-500">
														<div>
															<Icons.CaretUp
																size={26}
															/>
														</div>
														<div className="font-bold">
															{comment.upvoters!
																.length -
																comment.downvoters!
																	.length}
														</div>
														<div>
															<Icons.CaretDown
																size={26}
															/>
														</div>
													</div>
												</div>
												<div className="flex-1">
													<div className="relative">
														<div
															className={classNames(
																'ml-2 px-5 py-4 rounded-2xl rounded-tl-md bg-gray-600 text-gray-200',
															)}
														>
															{comment.content}
														</div>
														<div
															className={classNames(
																'absolute bottom-1 right-3 text-xs text-gray-300',
															)}
														>
															{timeAgo.format(
																dayjs(
																	new Date(
																		comment.createdAt,
																	),
																).toDate(),
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									),
								)}
							</>
						) : null}
					</DrawerBody>
					<DrawerFooter borderTopWidth="1px">
						<Button
							variant="outline"
							mr={3}
							onClick={resultAnswerDrawer.onClose}
						>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default DiscussionResults
