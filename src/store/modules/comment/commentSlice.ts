import { createSlice } from '@reduxjs/toolkit'

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
