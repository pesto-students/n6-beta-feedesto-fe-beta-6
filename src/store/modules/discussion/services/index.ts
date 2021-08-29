import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Discussion } from '../discussionSlice'

export const fetchDiscussionList = createAsyncThunk<Discussion[]>(
	'discussions',
	async () => {
		return await sendRequest.get<Discussion[]>(`discussion`)
	},
)

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

export interface DeleteDiscussionBody {
	id: string
}
export const deleteDiscussion = async (data: DeleteDiscussionBody) => {
	return await sendRequest.delete('discussion', {
		body: data,
		showToast: true,
	})
}
