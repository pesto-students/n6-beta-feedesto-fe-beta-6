import { createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Discussion, DiscussionResult } from 'types/models/discussion'

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
