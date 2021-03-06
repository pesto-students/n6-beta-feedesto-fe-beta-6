import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { User } from 'types/models/user'

export const fetchUsers = async (
	params: { isSuperAdmin: boolean } = { isSuperAdmin: false },
) => {
	const users = await sendRequest.get<User[]>(`user`, { params })
	if (params.isSuperAdmin) {
		return users
	}
	return users.filter((el) => !el.isAdmin)
}
export const fetchUserDetails = async () => {
	return await sendRequest.get<User[]>(`user/get`)
}

export interface UserState {
	currentUser: Partial<User>
}

const initialState: UserState = {
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
	extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
