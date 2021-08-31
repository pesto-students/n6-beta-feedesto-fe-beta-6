import { Box, Button, Icon, IconButton, Textarea } from '@chakra-ui/react'
import TimeAgo from 'javascript-time-ago'
import { DASHBOARD } from 'navigation/routes'
import React, { useEffect } from 'react'
import * as Icons from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from 'store'
import {
	addAnswer,
	fetchAnswerList,
	fillAddAnswerFormFields,
} from 'store/modules/answer/answerSlice'
import { fetchDiscussionList } from 'store/modules/discussion/services'

const DiscussionPage = () => {
	const params = useParams<{ id: string }>()
	const discussionId = params.id
	const dispatch = useDispatch()
	const { discussion: discussionStore, answer: answerStore } = useSelector(
		(state: RootState) => state,
	)
	const timeAgo = new TimeAgo('en-US')
	const history = useHistory()

	useEffect(() => {
		dispatch(
			fetchDiscussionList({
				id: discussionId,
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
				<div className="col-span-1 h-screen overflow-y-scroll">
					<div className="p-3">
						<div className="flex flex-col">
							<div className="flex-1">
								{answerStore.answerList.map((answer, index) => {
									return (
										<div key={answer.id} className="my-5">
											<div className="flex">
												<div className="flex-none">
													<div className="flex flex-col items-center text-gray-500">
														<div>
															{index % 2 == 0 ? (
																<Icons.CaretUpFill
																	size={26}
																	className="text-green-600"
																/>
															) : (
																<Icons.CaretUp
																	size={26}
																/>
															)}
														</div>
														<div className="textxl font-bold">
															{(index + 1) * 10}+
														</div>
														<div>
															{index % 3 == 0 &&
															index % 2 != 0 ? (
																<Icons.CaretDownFill
																	size={26}
																	className="text-red-600"
																/>
															) : (
																<Icons.CaretDown
																	size={26}
																/>
															)}
														</div>
													</div>
												</div>
												<div className="flex-1">
													<div className="h-full ml-2 px-5 py-3 rounded-2xl bg-gray-100">
														{answer.content}
													</div>
												</div>
											</div>
										</div>
									)
								})}
							</div>
							<div className="flex-none mt-3">
								<div className="w-full">
									<div>
										<Textarea
											id="answerInput"
											placeholder="Start writing here"
											value={
												answerStore.addAnswerForm
													.content
											}
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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default DiscussionPage
