import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Discussion } from '../discussionSlice'

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
