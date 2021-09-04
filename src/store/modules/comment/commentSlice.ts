import { createSlice } from '@reduxjs/toolkit'

export interface Comment {
	_id: string
	answerId: string
	userId: string
	upvoteCount: number
	downvoteCount: number
	hasUpvoted: boolean
	hasDownvoted: boolean
	content: string
	createdAt: string
	modifiedAt: string
}
export interface CommentState {}

const initialState: CommentState = {}

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
export const {} = commentSlice.actions

export default commentSlice.reducer
