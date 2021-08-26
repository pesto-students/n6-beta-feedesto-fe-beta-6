import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Discussion {
	id: number
	name: string
	login: string
}

export interface DiscussionState {
	discussionList: Discussion[]
}

const initialState: DiscussionState = {
	discussionList: [],
}

export const fetchDiscussionList = createAsyncThunk<Discussion[]>(
	'discussions/list',
	// if you type your function argument here
	async () => {
		const response = await fetch(`https://api.github.com/discussions`)
		return (await response.json()) as Discussion[]
	},
)

export const discussionSlice = createSlice({
	name: 'discussion',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDiscussionList.fulfilled, (state, action) => {
			state.discussionList = action.payload
		})
		builder.addCase(fetchDiscussionList.rejected, (state, action) => {
			console.log(action.error?.message)
		})
	},
})

// Action creators are generated for each case reducer function
// export const { } = discussionSlice.actions

export default discussionSlice.reducer
