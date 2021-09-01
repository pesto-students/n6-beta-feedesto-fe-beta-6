import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { fetchUserList, updateUserApprovalStatus } from './services'

export interface User {
	_id: string
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
	currentUser: Partial<User>
}

const initialState: UserState = {
	userList: [],
	currentUser: {},
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<User>) => {
			state.currentUser = action.payload
		},
	},
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
export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
