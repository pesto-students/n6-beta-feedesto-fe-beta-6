import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { fetchUserList } from './services'

export interface User {
	id: string
	name: string
	email: string
	googleUserId: string
	organizationId: string
	isAdmin: boolean
	isVerified: boolean
	createdAt: string
	modifiedAt: string
}
export interface UserState {
	userList: User[]
}

const initialState: UserState = {
	userList: [],
}

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
