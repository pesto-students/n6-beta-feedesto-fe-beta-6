import { createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { User } from '../user/userSlice'

export interface Discussion {
	_id: string
	organizationId: string
	title: string
	description: string
	startDate: string
	endDate: string
	participantIds: string[]
	viewerIds: string[]
	createdAt: string
	modifiedAt: string
}

export const fetchDiscussions = async (
	params: {
		_id?: string
		participantId?: string
		asParticipant?: boolean
	} = {},
) => {
	return await sendRequest.get<Discussion[]>(`discussion`, {
		params,
	})
}
export interface DiscussionResult {
	_id: string
	content: string
	discussionId: string
	userId: User
	upvoteIds: string[]
	downvoteIds: string[]
	commentIds: string[]
	createdAt: string
	modifiedAt: string
	numberOfUpvotes: number
	numberOfDownvotes: number
	score: number
}
export const fetchDiscussionResultList = async (params: { _id: string }) => {
	return await sendRequest.get<DiscussionResult[]>(`discussion/score`, {
		params,
	})
}

export const discussionSlice = createSlice({
	name: 'discussion',
	initialState: {},
	reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = discussionSlice.actions

export default discussionSlice.reducer
