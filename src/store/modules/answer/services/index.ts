import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Answer } from '../answerSlice'

export const fetchAnswerList = createAsyncThunk<
	Answer[],
	{
		id?: string
		discussionId?: string
		userId?: string
	}
>('answers', async (params = {}) => {
	return await sendRequest.get<Answer[]>(`answer`, {
		params,
	})
})

export interface AddAnswerBody {
	discussionId: string
	content: string
	userId?: string
}
export const addAnswer = async (data: AddAnswerBody) => {
	return await sendRequest.post('answer', {
		body: data,
		showToast: true,
	})
}
