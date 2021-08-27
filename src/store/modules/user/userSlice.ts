import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface User {
	id: number
	name: string
	login: string
}

export interface UserState {
	userList: User[]
}

const initialState: UserState = {
	userList: [],
}

export const fetchUserList = createAsyncThunk<User[]>(
	'users/list',
	// if you type your function argument here
	async () => {
		const response = await fetch(`https://api.github.com/users`)
		return (await response.json()) as User[]
	},
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserList.fulfilled, (state, action) => {
			state.userList = action.payload
		})
		builder.addCase(fetchUserList.rejected, (state, action) => {
			console.log(action.error?.message)
		})
	},
})

// Action creators are generated for each case reducer function
// export const { } = userSlice.actions

export default userSlice.reducer
