import { createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'

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

export const discussionSlice = createSlice({
	name: 'discussion',
	initialState: {},
	reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = discussionSlice.actions

export default discussionSlice.reducer
