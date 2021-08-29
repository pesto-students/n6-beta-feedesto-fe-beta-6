import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { APP } from 'navigation/routes'
import { GoogleLoginResponse } from 'react-google-login'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { sendRequest } from 'services/networkService'
import { LoginType, SelectedTab } from '../../../types/enums'
import {
	loginUser,
	LoginUserBody,
	registerOrganization,
	RegisterOrganizationBody,
	registerUser,
	RegisterUserBody,
} from './services'

export interface AuthState {
	loginUserForm: LoginUserBody
	registerUserForm: RegisterUserBody
	registerOrganizationForm: RegisterOrganizationBody
	loginType: LoginType
	selectedTab: SelectedTab
	isGoogleLoggedIn: boolean
	isAuthenticated: boolean
	authToken?: string
}

const initialState: AuthState = {
	loginType: LoginType.USER,
	loginUserForm: {
		googleUserId: '',
	},
	registerOrganizationForm: {
		email: '',
		googleUserId: '',
		name: '',
		organizationName: '',
	},
	registerUserForm: {
		email: '',
		googleUserId: '',
		name: '',
		organizationId: '',
	},
	selectedTab: SelectedTab.GET_STARTED,
	isGoogleLoggedIn: false,
	isAuthenticated: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthSelectedTab: (state, action: PayloadAction<SelectedTab>) => {
			state.selectedTab = action.payload
		},
		setAuthToken: (state, action: PayloadAction<string>) => {
			state.authToken = action.payload
		},
		setAuthLoginType: (state, action: PayloadAction<LoginType>) => {
			state.loginType = action.payload
		},
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload
		},
		setIsGoogleLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isGoogleLoggedIn = action.payload
		},
		fillAuthLoginUserFields: (
			state,
			action: PayloadAction<LoginUserBody>,
		) => {
			state.loginUserForm = action.payload
		},
		fillAuthRegisterUserFields: (
			state,
			{
				payload: { email, googleUserId, name, organizationId },
			}: PayloadAction<Partial<RegisterUserBody>>,
		) => {
			if (email) state.registerUserForm.email = email
			if (googleUserId) state.registerUserForm.googleUserId = googleUserId
			if (name) state.registerUserForm.name = name
			if (organizationId)
				state.registerUserForm.organizationId = organizationId
		},
		fillAuthRegisterOrganizationFields: (
			state,
			{
				payload: { email, googleUserId, name, organizationName },
			}: PayloadAction<Partial<RegisterOrganizationBody>>,
		) => {
			if (email) state.registerOrganizationForm.email = email
			if (googleUserId)
				state.registerOrganizationForm.googleUserId = googleUserId
			if (name) state.registerOrganizationForm.name = name
			if (organizationName)
				state.registerOrganizationForm.organizationName =
					organizationName
		},
		logOutUser: (state) => {
			state = initialState
			localStorage.clear()
			location.href = '/'
		},
	},
	extraReducers: (builder) => {
		// User Login Success
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<{ token: string }>) => {
				state.isAuthenticated = true
				state.authToken = action.payload.token
				localStorage.setItem('token', state.authToken)
				localStorage.setItem('loginType', state.loginType)
			},
		)
		builder.addCase(
			loginUser.rejected,
			(state, action: PayloadAction<any>) => {
				state.isAuthenticated = false
				state.selectedTab = SelectedTab.DETAILS_INPUT
			},
		)
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<{ token: string }>) => {
				state.isAuthenticated = true
				state.authToken = action.payload.token
				localStorage.setItem('token', state.authToken)
				localStorage.setItem('loginType', state.loginType)
			},
		)
		builder.addCase(
			registerOrganization.fulfilled,
			(state, action: PayloadAction<{ token: string }>) => {
				state.isAuthenticated = true
				state.authToken = action.payload.token
				localStorage.setItem('token', state.authToken)
				localStorage.setItem('loginType', state.loginType)
			},
		)
	},
})

// Action creators are generated for each case reducer function
export const {
	setAuthLoginType,
	setAuthToken,
	setAuthSelectedTab,
	setIsAuthenticated,
	setIsGoogleLoggedIn,
	fillAuthLoginUserFields,
	fillAuthRegisterOrganizationFields,
	fillAuthRegisterUserFields,
	logOutUser,
} = authSlice.actions

export default authSlice.reducer