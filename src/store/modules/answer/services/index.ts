import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Answer } from '../answerSlice'

export const fetchAnswerList = createAsyncThunk<
	Answer[],
	{
		_id?: string
		discussionId?: string
		userId?: string
	}
>('answers', async (params = {}) => {
	return fetchAnswers(params)
})

export const fetchAnswers = async (
	params: {
		_id?: string
		discussionId?: string
		userId?: string
	} = {},
) => {
	return await sendRequest.get<Answer[]>(`answer`, {
		params,
	})
}

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

export interface AddAnswerUpvoteBody {
	answerId: string
}
export const addAnswerUpvote = async (data: AddAnswerUpvoteBody) => {
	return await sendRequest.post('answer/upvote', {
		body: data,
		showToast: true,
	})
}
export interface AddAnswerDownvoteBody {
	answerId: string
}
export const addAnswerDownvote = async (data: AddAnswerDownvoteBody) => {
	return await sendRequest.post('answer/downvote', {
		body: data,
		showToast: true,
	})
}
