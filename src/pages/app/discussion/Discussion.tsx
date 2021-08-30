import { Box, Button, Icon, IconButton, Textarea } from '@chakra-ui/react'
import TimeAgo from 'javascript-time-ago'
import { APP } from 'navigation/routes'
import React, { useEffect } from 'react'
import * as Icons from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from 'store'
import { fetchDiscussionList } from 'store/modules/discussion/services'

const DiscussionPage = () => {
	const params = useParams<{ id: string }>()
	const discussionId = params.id
	const dispatch = useDispatch()
	const { discussion: discussionStore } = useSelector(
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
	}, [])

	const [discussion] = discussionStore.discussionList

	if (!discussion) {
		history.replace(APP)
		return <></>
	}

	return (
		<div>
			<div className="grid grid-cols-2" style={{ zIndex: -1 }}>
				<div
					className="col-span-1 bg-gray-100 h-screen"
					style={{ zIndex: 'inherit' }}
				>
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
				<div className="col-span-1">
					<div className="p-2">
						<div className="flex flex-col h-full">
							<div className="flex-1">
								<div></div>
								Chat Section here
							</div>
							<div className="flex-none">
								<div className="flex w-full">
									<div className="flex-1">
										<Textarea
											id="answerInput"
											onChange={(e) => {}}
											resize="block"
										></Textarea>
										<div className="relative float-right right-5 bottom-10 text-white">
											<Button
												aria-label="sendMessage"
												rightIcon={
													<Icons.CursorFill
														size={16}
													/>
												}
												colorScheme="blue"
												size="sm"
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
