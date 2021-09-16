import {
	Avatar,
	Button,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Textarea,
} from '@chakra-ui/react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Routes } from 'navigation/routes'
import { useEffect, useState } from 'react'
import * as Icons from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from 'services/form'
import { RootState } from 'store'
import { fetchAnswers } from 'store/modules/answer/answerSlice'
import { fetchDiscussions } from 'store/modules/discussion/discussionSlice'
import { Answer } from 'types/models/answer'
import { Discussion } from 'types/models/discussion'
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

export interface AddCommentBody {
	answerId: string
	content: string
	userId?: string
}

export interface AddCommentUpvoteBody {
	commentId: string
}

export interface AddCommentDownvoteBody {
	commentId: string
}

const DiscussionViewPage = () => {
	const params = useParams<{ id: string }>()
	const discussionId = params.id
	const { user: userStore } = useSelector((state: RootState) => state)
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
					if (!answerController.add.form.fields.content) return
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

	const addCommentUpvoteFieldsInitial: AddCommentUpvoteBody = {
		commentId: '',
	}
	const [addCommentUpvoteFormFields, setAddCommentUpvoteFormFields] =
		useState<Partial<AddCommentUpvoteBody>>(addCommentUpvoteFieldsInitial)

	const addCommentDownvoteFieldsInitial: AddCommentDownvoteBody = {
		commentId: '',
	}
	const [addCommentDownvoteFormFields, setAddCommentDownvoteFormFields] =
		useState<Partial<AddCommentDownvoteBody>>(
			addCommentDownvoteFieldsInitial,
		)

	const commentController: {
		addUpvote: FormDrawerController<AddCommentUpvoteBody>
		addDownvote: FormDrawerController<AddCommentDownvoteBody>
	} = {
		addUpvote: {
			form: new Form(addCommentUpvoteFormFields),
			updateFields: (props) =>
				setAddCommentUpvoteFormFields({
					...addCommentUpvoteFormFields,
					...props,
				}),
			async onSubmit(commentId: string) {
				try {
					commentController.addUpvote.form.fields.commentId =
						commentId
					await commentController.addUpvote.form.submit(
						'comment/upvote',
						{
							method: 'POST',
						},
					)
					await fetchDiscussionAnswers()
					setAddCommentUpvoteFormFields(addCommentUpvoteFieldsInitial)
				} catch (err) {
					console.log(err)
				}
			},
		},
		addDownvote: {
			form: new Form(addCommentDownvoteFormFields),
			updateFields: (props) =>
				setAddCommentDownvoteFormFields({
					...addCommentDownvoteFormFields,
					...props,
				}),
			async onSubmit(commentId: string) {
				try {
					commentController.addDownvote.form.fields.commentId =
						commentId
					await commentController.addDownvote.form.submit(
						'comment/downvote',
						{
							method: 'POST',
						},
					)
					await fetchDiscussionAnswers()
					setAddCommentDownvoteFormFields(
						addCommentDownvoteFieldsInitial,
					)
				} catch (err) {
					console.log(err)
				}
			},
		},
	}

	const handleCommentAdd = async (
		answer: Answer & { addCommentForm: Form<AddCommentBody> },
	) => {
		if (!answer.addCommentForm.fields.content) return
		await answer.addCommentForm.submit('comment')

		fetchDiscussionAnswers()
	}

	useEffect(() => {
		fetchDiscussionDetails(), fetchDiscussionAnswers()
	}, [])

	const isAdmin = userStore.currentUser.isAdmin

	const Answer = ({
		answer,
	}: {
		answer: Answer & { addCommentForm: Form<AddCommentBody> }
	}) => {
		return (
			<div key={answer._id} className="my-4">
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
										className={classNames({
											'cursor-pointer':
												!answer.hasUpvoted &&
												!answer.hasDownvoted &&
												!userStore.currentUser.isAdmin,
										})}
										onClick={() => {
											if (
												answer.hasUpvoted ||
												answer.hasDownvoted ||
												userStore.currentUser.isAdmin
											)
												return
											answerController.addUpvote.onSubmit(
												answer._id,
											)
										}}
									/>
								)}
							</div>
							<div className="text-xl font-bold">
								{answer.upvoteCount - answer.downvoteCount}
								{!isAdmin && '+'}
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
										className={classNames({
											'cursor-pointer':
												!answer.hasUpvoted &&
												!answer.hasDownvoted &&
												!userStore.currentUser.isAdmin,
										})}
										onClick={() => {
											if (
												answer.hasUpvoted ||
												answer.hasDownvoted ||
												userStore.currentUser.isAdmin
											)
												return
											answerController.addDownvote.onSubmit(
												answer._id,
											)
										}}
									/>
								)}
							</div>
						</div>
					</div>
					<div className="flex-1">
						{isAdmin && (
							<div className="flex items-center ml-2 my-1">
								<Avatar
									size="2xs"
									src={answer.userId?.googleAvatarUrl}
								/>
								<div className="text-xs pl-1">
									{answer.userId?.name}
								</div>
							</div>
						)}
						<div className="relative">
							<div
								className={classNames(
									'ml-2 px-5 py-3 rounded-2xl rounded-tl-md bg-gray-200',
									{
										'bg-gray-700 text-white':
											answer.userId?._id ===
											userStore.currentUser._id,
									},
								)}
							>
								{answer.content}
							</div>
							<div className="absolute bottom-1 right-3 text-xs text-gray-500">
								{dayjs(new Date(answer.createdAt)).format(
									'D MMM, h:mm A',
								)}
							</div>
						</div>
						<div className="mt-1">
							{answer.comments.map((comment) => (
								<div className="my-2 ml-2" key={comment._id}>
									<div className="flex">
										<div className="flex-none">
											<div className="flex flex-col items-center text-gray-500">
												<div>
													{comment.hasUpvoted ? (
														<Icons.CaretUpFill
															size={22}
															className="text-green-600"
														/>
													) : (
														<Icons.CaretUp
															size={22}
															className={classNames(
																{
																	'cursor-pointer':
																		!comment.hasUpvoted &&
																		!comment.hasDownvoted &&
																		!userStore
																			.currentUser
																			.isAdmin,
																},
															)}
															onClick={() => {
																if (
																	comment.hasUpvoted ||
																	comment.hasDownvoted ||
																	userStore
																		.currentUser
																		.isAdmin
																)
																	return
																commentController.addUpvote.onSubmit(
																	comment._id,
																)
															}}
														/>
													)}
												</div>
												<div className=" font-bold">
													{comment.upvoteCount -
														comment.downvoteCount}
													{!isAdmin && '+'}
												</div>
												<div>
													{comment.hasDownvoted ? (
														<Icons.CaretDownFill
															size={22}
															className="text-red-600"
														/>
													) : (
														<Icons.CaretDown
															size={22}
															className={classNames(
																{
																	'cursor-pointer':
																		!comment.hasUpvoted &&
																		!comment.hasDownvoted &&
																		!userStore
																			.currentUser
																			.isAdmin,
																},
															)}
															onClick={() => {
																if (
																	comment.hasUpvoted ||
																	comment.hasDownvoted ||
																	userStore
																		.currentUser
																		.isAdmin
																)
																	return
																commentController.addDownvote.onSubmit(
																	comment._id,
																)
															}}
														/>
													)}
												</div>
											</div>
										</div>
										<div className="flex-1">
											<div className="h-full">
												{isAdmin && (
													<div className="flex items-center ml-2 my-1">
														<Avatar
															size="2xs"
															src={
																comment.userId
																	?.googleAvatarUrl
															}
														/>
														<div className="text-xs pl-1">
															{
																comment.userId
																	?.name
															}
														</div>
													</div>
												)}
												<div className="relative">
													<div
														className={classNames(
															'ml-2 px-4 py-2 rounded-xl rounded-tl-md bg-gray-100',
															{
																'bg-gray-600 text-white':
																	comment
																		.userId
																		?._id ===
																	userStore
																		.currentUser
																		._id,
															},
														)}
													>
														{comment.content}
													</div>

													<div className="absolute bottom-1 right-3 text-xs text-gray-400">
														{dayjs(
															new Date(
																comment.createdAt,
															),
														).format(
															'D MMM, h:mm A',
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
							{!isAdmin && (
								<div className="ml-2 pr-2 mt-2 w-full">
									<InputGroup size="md">
										<Input
											pr="3rem"
											type="text"
											placeholder="Add your comments here..."
											onChange={(e) => {
												answer.addCommentForm.fields.content =
													e.target.value
											}}
											onKeyPress={(e) => {
												if (e?.key == 'Enter') {
													handleCommentAdd(answer)
													e.preventDefault()
												}
											}}
										/>
										<InputRightElement width="3rem">
											<IconButton
												aria-label="addComment"
												h="1.75rem"
												size="sm"
												colorScheme="blue"
												icon={<Icons.CursorFill />}
												onClick={() =>
													handleCommentAdd(answer)
												}
											></IconButton>
										</InputRightElement>
									</InputGroup>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (!discussionDetails) return null

	return (
		<div className="h-full">
			<div className="grid grid-cols-2 h-full">
				<div className="col-span-1 bg-gray-200 h-screen overflow-hidden">
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
				<div className="col-span-1 h-screen overflow-x-hidden">
					<div className="p-3 overflow-y-scroll">
						<div className="flex flex-col">
							{!isAdmin && (
								<div className="flex-none">
									<div className="w-full">
										<div>
											<Textarea
												id="answerInput"
												placeholder="Start writing here..."
												value={
													answerController.add.form
														.fields.content
												}
												rows={5}
												onChange={(e) => {
													answerController.add.updateFields(
														{
															content:
																e.target.value,
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
											<div className="relative float-right right-2 bottom-10 text-white z-10">
												<Button
													aria-label="sendAnswer"
													rightIcon={
														<Icons.CursorFill
															size={16}
														/>
													}
													isLoading={
														answerController.add
															.form.submitting
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
							)}
							<div className="flex-1">
								{answerList.map((answer, index) => (
									<Answer answer={answer} key={answer._id} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DiscussionViewPage
