import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginType, SelectedTab } from 'types/enums'

export interface AuthState {
	loginType: LoginType
	selectedTab: SelectedTab
}

const initialState: AuthState = {
	loginType: LoginType.USER,
	selectedTab: SelectedTab.GET_STARTED,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		tabChange: (state, action: PayloadAction<SelectedTab>) => {
			state.selectedTab = action.payload
		},
		loginTypeChange: (state, action: PayloadAction<LoginType>) => {
			state.loginType = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { tabChange, loginTypeChange } = authSlice.actions

export default authSlice.reducer
