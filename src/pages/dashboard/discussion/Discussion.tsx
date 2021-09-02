import {
	Button,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Textarea,
} from '@chakra-ui/react'
import classNames from 'classnames'
import TimeAgo from 'javascript-time-ago'
import { Routes } from 'navigation/routes'
import React, { useEffect, useState } from 'react'
import * as Icons from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from 'services/form'
import { RootState } from 'store'
import { Answer, fetchAnswers } from 'store/modules/answer/answerSlice'
import { AddCommentBody } from 'store/modules/comment/services'
import {
	Discussion,
	fetchDiscussions,
} from 'store/modules/discussion/discussionSlice'
import { FormDrawerController } from 'types/types'

export interface AddAnswerBody {
	discussionId: string
	content: string
	userId?: string
}

export interface AddAnswerUpvoteBody {
	answerId: string
}

export interface AddAnswerDownvoteBody {
	answerId: string
}

const DiscussionPage = () => {
	const params = useParams<{ id: string }>()
	const discussionId = params.id
	const { user: userStore } = useSelector((state: RootState) => state)
	const timeAgo = new TimeAgo('en-US')
	const history = useHistory()

	const [answerList, setAnswerList] = useState<
		(Answer & { addCommentForm: Form<AddCommentBody> })[]
	>([])

	const fetchDiscussionAnswers = async () => {
		const answers = await fetchAnswers({ discussionId })
		setAnswerList(
			answers.map((el) => {
				return {
					...el,
					addCommentForm: new Form<AddCommentBody>({
						answerId: el._id,
						content: '',
					}),
				}
			}),
		)
	}

	const [discussionDetails, setDiscussionDetails] = useState<Discussion>()
	const fetchDiscussionDetails = async () => {
		const [discussion] = await fetchDiscussions({
			_id: discussionId,
			asParticipant: true,
		})

		if (!discussion) {
			history.replace(Routes.DASHBOARD)
			return <></>
		}

		setDiscussionDetails(discussion)
	}

	const addAnswerFieldsInitial: AddAnswerBody = {
		content: '',
		discussionId,
	}
	const [addAnswerFormFields, setAddAnswerFormFields] = useState<
		Partial<AddAnswerBody>
	>(addAnswerFieldsInitial)

	const addAnswerUpvoteFieldsInitial: AddAnswerUpvoteBody = {
		answerId: '',
	}
	const [addAnswerUpvoteFormFields, setAddAnswerUpvoteFormFields] = useState<
		Partial<AddAnswerUpvoteBody>
	>(addAnswerUpvoteFieldsInitial)

	const addAnswerDownvoteFieldsInitial: AddAnswerDownvoteBody = {
		answerId: '',
	}
	const [addAnswerDownvoteFormFields, setAddAnswerDownvoteFormFields] =
		useState<Partial<AddAnswerDownvoteBody>>(addAnswerDownvoteFieldsInitial)

	const answerController: {
		add: FormDrawerController<AddAnswerBody>
		addUpvote: FormDrawerController<AddAnswerUpvoteBody>
		addDownvote: FormDrawerController<AddAnswerDownvoteBody>
	} = {
		add: {
			form: new Form(addAnswerFormFields),
			updateFields: (props) =>
				setAddAnswerFormFields({
					...addAnswerFormFields,
					...props,
				}),
			async onSubmit() {
				try {
					await answerController.add.form.submit('answer', {
						method: 'POST',
					})
					await fetchDiscussionAnswers()
					setAddAnswerFormFields(addAnswerFieldsInitial)
				} catch (err) {
					console.log(err)
				}
			},
		},
		addUpvote: {
			form: new Form(addAnswerUpvoteFormFields),
			updateFields: (props) =>
				setAddAnswerUpvoteFormFields({
					...addAnswerUpvoteFormFields,
					...props,
				}),
			async onSubmit(answerId: string) {
				try {
					answerController.addUpvote.form.fields.answerId = answerId
					await answerController.addUpvote.form.submit(
						'answer/upvote',
						{
							method: 'POST',
						},
					)
					await fetchDiscussionAnswers()
					setAddAnswerUpvoteFormFields(addAnswerUpvoteFieldsInitial)
				} catch (err) {
					console.log(err)
				}
			},
		},
		addDownvote: {
			form: new Form(addAnswerDownvoteFormFields),
			updateFields: (props) =>
				setAddAnswerDownvoteFormFields({
					...addAnswerDownvoteFormFields,
					...props,
				}),
			async onSubmit(answerId: string) {
				try {
					answerController.addDownvote.form.fields.answerId = answerId
					await answerController.addDownvote.form.submit(
						'answer/downvote',
						{
							method: 'POST',
						},
					)
					await fetchDiscussionAnswers()
					setAddAnswerDownvoteFormFields(
						addAnswerDownvoteFieldsInitial,
					)
				} catch (err) {
					console.log(err)
				}
			},
		},
	}

	useEffect(() => {
		fetchDiscussionDetails(), fetchDiscussionAnswers()
	}, [])

	if (!discussionDetails) return null

	return (
		<div className="h-full">
			<div className="grid grid-cols-2 h-full">
				<div className="col-span-1 bg-gray-200 h-full overflow-hidden">
					<div className="p-4">
						<div className="text-2xl font-semibold">
							{discussionDetails.title}
						</div>
						<div>{discussionDetails.description}</div>
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
												answerController.add.form.fields
													.content
											}
											rows={5}
											onChange={(e) => {
												answerController.add.updateFields(
													{
														content: e.target.value,
													},
												)
											}}
											onKeyPress={(e) => {
												if (e.key == 'Enter') {
													answerController.add.onSubmit()
													e.preventDefault()
												}
											}}
											resize="none"
										></Textarea>
										<div className="relative float-right right-2 bottom-10 text-white z-20">
											<Button
												aria-label="sendAnswer"
												rightIcon={
													<Icons.CursorFill
														size={16}
													/>
												}
												isLoading={
													answerController.add.form
														.submitting
												}
												colorScheme="blue"
												size="sm"
												onClick={() =>
													answerController.add.onSubmit()
												}
											>
												Send
											</Button>
										</div>
									</div>
								</div>
							</div>
							<div className="flex-1">
								{answerList.map((answer, index) => {
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
																		answerController.addUpvote.onSubmit(
																			answer._id,
																		)
																	}
																/>
															)}
														</div>
														<div className="text-xl font-bold">
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
																		answerController.addDownvote.onSubmit(
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
														className={classNames(
															'ml-2 px-5 py-3 rounded-2xl bg-gray-100 ',
															{
																'bg-gray-700 text-white':
																	answer.userId ===
																	userStore
																		.currentUser
																		._id,
															},
														)}
													>
														{answer.content}
													</div>
													<div className="my-1 ml-2">
														<div className="flex">
															<div className="flex-none">
																<div className="flex flex-col items-center text-gray-500">
																	<div>
																		{answer.hasUpvoted ? (
																			<Icons.CaretUpFill
																				size={
																					22
																				}
																				className="text-green-600"
																			/>
																		) : (
																			<Icons.CaretUp
																				size={
																					22
																				}
																				className="cursor-pointer"
																				onClick={() =>
																					answerController.addUpvote.onSubmit(
																						answer._id,
																					)
																				}
																			/>
																		)}
																	</div>
																	<div className=" font-bold">
																		{answer.upvoteCount -
																			answer.downvoteCount}
																		+
																	</div>
																	<div>
																		{answer.hasDownvoted ? (
																			<Icons.CaretDownFill
																				size={
																					22
																				}
																				className="text-red-600"
																			/>
																		) : (
																			<Icons.CaretDown
																				size={
																					22
																				}
																				className="cursor-pointer"
																				onClick={() =>
																					answerController.addDownvote.onSubmit(
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
																	className={classNames(
																		'ml-2 px-5 py-3 rounded-2xl bg-gray-100',
																		{
																			'bg-gray-700 text-white':
																				answer.userId ===
																				userStore
																					.currentUser
																					._id,
																		},
																	)}
																>
																	{
																		answer.content
																	}
																</div>
															</div>
														</div>
													</div>
													<div className="ml-2 pr-2 mt-2 w-full">
														<InputGroup size="md">
															<Input
																pr="3rem"
																type="text"
																placeholder="Add your comments here..."
																onChange={(
																	e,
																) => {
																	answer.addCommentForm.fields.content =
																		e.target.value
																}}
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
																	onClick={() => {
																		answer.addCommentForm.submit(
																			'comment',
																		)
																	}}
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
