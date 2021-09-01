import {
	Box,
	Button,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Textarea,
} from '@chakra-ui/react'
import TimeAgo from 'javascript-time-ago'
import { DASHBOARD } from 'navigation/routes'
import React, { useEffect } from 'react'
import * as Icons from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from 'store'
import {
	addAnswer,
	addAnswerDownvote,
	addAnswerUpvote,
	fetchAnswerList,
	fillAddAnswerFormFields,
} from 'store/modules/answer/answerSlice'
import { fetchDiscussionList } from 'store/modules/discussion/services'

const DiscussionPage = () => {
	const params = useParams<{ id: string }>()
	const discussionId = params.id
	const dispatch = useDispatch()
	const {
		discussion: discussionStore,
		answer: answerStore,
		user: userStore,
	} = useSelector((state: RootState) => state)
	const timeAgo = new TimeAgo('en-US')
	const history = useHistory()

	useEffect(() => {
		dispatch(
			fetchDiscussionList({
				_id: discussionId,
				asParticipant: true,
			}),
		)
		dispatch(fetchAnswerList({ discussionId }))
		dispatch(fillAddAnswerFormFields({ content: '', discussionId }))
	}, [])

	const handleSubmitAnswer = async () => {
		if (!answerStore.addAnswerForm.content) return
		await addAnswer(answerStore.addAnswerForm)
		dispatch(fetchAnswerList({ discussionId }))
		dispatch(fillAddAnswerFormFields({ content: '' }))
	}

	const handleAnswerUpvote = async (answerId: string) => {
		await addAnswerUpvote({ answerId })
		dispatch(fetchAnswerList({ discussionId }))
	}
	const handleAnswerDownvote = async (answerId: string) => {
		await addAnswerDownvote({ answerId })
		dispatch(fetchAnswerList({ discussionId }))
	}

	const [discussion] = discussionStore.discussionList

	if (!discussion) {
		history.replace(DASHBOARD)
		return <></>
	}

	return (
		<div className="h-full">
			<div className="grid grid-cols-2 h-full">
				<div className="col-span-1 bg-gray-200 h-full overflow-hidden">
					<div className="p-4">
						<div className="text-2xl font-semibold">
							{discussion.title}
						</div>
						<div>{discussion.description}</div>
						<div className="absolute bottom-3">
							<Button
								className="cursor-pointer"
								aria-label="back"
								colorScheme="blue"
								onClick={() => {
									history.goBack()
								}}
								leftIcon={<Icons.ArrowLeft />}
							>
								Back to Discussions
							</Button>
						</div>
					</div>
				</div>
				<div className="col-span-1 h-screen mt-5 overflow-y-scroll">
					<div className="p-3">
						<div className="flex flex-col">
							<div className="flex-none">
								<div className="w-full">
									<div>
										<Textarea
											id="answerInput"
											placeholder="Start writing here..."
											value={
												answerStore.addAnswerForm
													.content
											}
											rows={5}
											onChange={(e) => {
												dispatch(
													fillAddAnswerFormFields({
														content: e.target.value,
													}),
												)
											}}
											onKeyPress={(e) => {
												if (e.key == 'Enter') {
													handleSubmitAnswer()
													e.preventDefault()
												}
											}}
											resize="none"
										></Textarea>
										<div className="relative float-right right-2 bottom-10 text-white">
											<Button
												aria-label="sendMessage"
												rightIcon={
													<Icons.CursorFill
														size={16}
													/>
												}
												colorScheme="blue"
												size="sm"
												onClick={() =>
													handleSubmitAnswer()
												}
											>
												Send
											</Button>
										</div>
									</div>
								</div>
							</div>
							<div className="flex-1">
								{answerStore.answerList.map((answer, index) => {
									return (
										<div key={answer._id} className="my-5">
											<div className="flex">
												<div className="flex-none">
													<div className="flex flex-col items-center text-gray-500">
														<div>
															{answer.hasUpvoted ? (
																<Icons.CaretUpFill
																	size={26}
																	className="text-green-600"
																/>
															) : (
																<Icons.CaretUp
																	size={26}
																	className="cursor-pointer"
																	onClick={() =>
																		handleAnswerUpvote(
																			answer._id,
																		)
																	}
																/>
															)}
														</div>
														<div className="textxl font-bold">
															{answer.upvoteCount -
																answer.downvoteCount}
															+
														</div>
														<div>
															{answer.hasDownvoted ? (
																<Icons.CaretDownFill
																	size={26}
																	className="text-red-600"
																/>
															) : (
																<Icons.CaretDown
																	size={26}
																	className="cursor-pointer"
																	onClick={() =>
																		handleAnswerDownvote(
																			answer._id,
																		)
																	}
																/>
															)}
														</div>
													</div>
												</div>
												<div className="flex-1">
													<div
														className={
															'ml-2 px-5 py-3 rounded-2xl bg-gray-100 ' +
															(answer.userId ===
															userStore
																.currentUser._id
																? 'bg-gray-700 text-white'
																: '')
														}
													>
														{answer.content}
													</div>
													<div className="ml-2 mt-2 w-full">
														<InputGroup size="md">
															<Input
																pr="3rem"
																type="text"
																placeholder="Add your comments here..."
															/>
															<InputRightElement width="3rem">
																<IconButton
																	aria-label="addComment"
																	h="1.75rem"
																	size="sm"
																	colorScheme="blue"
																	icon={
																		<Icons.CursorFill />
																	}
																	onClick={() => {}}
																></IconButton>
															</InputRightElement>
														</InputGroup>
													</div>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default DiscussionPage
