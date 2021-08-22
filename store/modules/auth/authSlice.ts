import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginType, SelectedTab } from 'types/enums'
import { Organization } from '../organization/organizationSlice'

export interface AuthState {
	loginType: LoginType
	selectedTab: SelectedTab
	selectedOrganizationId?: string
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
		organizationChange: (state, action: PayloadAction<string>) => {
			state.selectedOrganizationId = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { tabChange, loginTypeChange, organizationChange } =
	authSlice.actions

export default authSlice.reducer
