import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Comment } from '../commentSlice'

export const fetchCommentList = createAsyncThunk<
	Comment[],
	{
		_id?: string
		answerId?: string
		userId?: string
	}
>('comments', async (params = {}) => {
	return await sendRequest.get<Comment[]>(`comment`, {
		params,
	})
})

export interface AddCommentBody {
	answerId: string
	content: string
	userId?: string
}
export const addComment = async (data: AddCommentBody) => {
	return await sendRequest.post('comment', {
		body: data,
		showToast: true,
	})
}

export interface AddCommentUpvoteBody {
	commentId: string
}
export const addCommentUpvote = async (data: AddCommentUpvoteBody) => {
	return await sendRequest.post('comment/upvote', {
		body: data,
		showToast: true,
	})
}
export interface AddCommentDownvoteBody {
	commentId: string
}
export const addCommentDownvote = async (data: AddCommentDownvoteBody) => {
	return await sendRequest.post('comment/downvote', {
		body: data,
		showToast: true,
	})
}
