import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginType, SelectedTab } from '../../../types/enums'

export interface AuthState {
	loginType: LoginType
	selectedTab: SelectedTab
	googleAuthToken?: string
	userNameInputText?: string
	selectedOrganizationId?: string
	organizationStrength?: string
	organizationNameInputText?: string
	organizationDesignationInputText?: string
}

const initialState: AuthState = {
	loginType: LoginType.USER,
	userNameInputText: '',
	organizationNameInputText: '',
	organizationDesignationInputText: '',
	selectedTab: SelectedTab.GET_STARTED,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		tabUpdate: (state, action: PayloadAction<SelectedTab>) => {
			state.selectedTab = action.payload
		},
		loginTypeUpdate: (state, action: PayloadAction<LoginType>) => {
			state.loginType = action.payload
		},
		googleAuthTokenUpdate: (state, action: PayloadAction<string>) => {
			state.googleAuthToken = action.payload
		},
		userNameInputTextUpdate: (state, action: PayloadAction<string>) => {
			state.userNameInputText = action.payload
		},
		organizationUpdate: (state, action: PayloadAction<string>) => {
			state.selectedOrganizationId = action.payload
		},
		organizationStrengthUpdate: (state, action: PayloadAction<string>) => {
			state.organizationStrength = action.payload
		},
		organizationNameInputTextUpdate: (
			state,
			action: PayloadAction<string>,
		) => {
			state.organizationNameInputText = action.payload
		},
		organizationDesignationInputTextUpdate: (
			state,
			action: PayloadAction<string>,
		) => {
			state.organizationDesignationInputText = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	loginTypeUpdate,
	organizationUpdate,
	organizationDesignationInputTextUpdate,
	organizationNameInputTextUpdate,
	tabUpdate,
	userNameInputTextUpdate,
	googleAuthTokenUpdate,
	organizationStrengthUpdate,
} = authSlice.actions

export default authSlice.reducer
