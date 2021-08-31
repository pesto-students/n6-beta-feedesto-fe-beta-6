import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Discussion } from '../discussionSlice'

export const fetchDiscussionList = createAsyncThunk<
	Discussion[],
	{
		id?: string
		participantId?: string
		asParticipant?: boolean
	}
>('discussions', async (params = {}) => {
	return await sendRequest.get<Discussion[]>(`discussion`, {
		params,
	})
})

export interface AddDiscussionBody {
	title: string
	description: string
	startDate: string
	endDate: string
	participantIds: string[]
	viewerIds: string[]
}
export const addDiscussion = async (data: AddDiscussionBody) => {
	return await sendRequest.post('discussion', {
		body: data,
		showToast: true,
	})
}

export interface UpdateDiscussionBody {
	id: string
	update: {
		title?: string
		description?: string
		startDate?: string
		endDate?: string
	}
}
export const updateDiscussion = async (data: UpdateDiscussionBody) => {
	return await sendRequest.put('discussion', {
		body: data,
		showToast: true,
	})
}

export interface DeleteDiscussionBody {
	id: string
}
export const deleteDiscussion = async (data: DeleteDiscussionBody) => {
	return await sendRequest.delete('discussion', {
		body: data,
		showToast: true,
	})
}
