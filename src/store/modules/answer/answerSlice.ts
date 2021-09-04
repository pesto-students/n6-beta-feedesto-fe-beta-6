import { createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { Comment } from '../comment/commentSlice'
import { User } from '../user/userSlice'

export interface Answer {
	_id: string
	discussionId: string
	userId?: User
	comments: Comment[]
	upvoteCount: number
	downvoteCount: number
	hasUpvoted: boolean
	hasDownvoted: boolean
	content: string
	createdAt: string
	modifiedAt: string
}

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

export const answerSlice = createSlice({
	name: 'answer',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
export const {} = answerSlice.actions

export default answerSlice.reducer
