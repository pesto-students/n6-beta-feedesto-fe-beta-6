import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginType } from 'types/enums'

export interface AuthState {
	loginType: LoginType
	authToken?: string
}

const initialState: AuthState = {
	loginType: LoginType.USER,
	authToken: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthToken: (state, action: PayloadAction<string>) => {
			state.authToken = action.payload
			localStorage.setItem('token', state.authToken)
		},
		setAuthLoginType: (state, action: PayloadAction<LoginType>) => {
			state.loginType = action.payload
			localStorage.setItem('loginType', state.loginType)
		},
		logOutUser: (state) => {
			state = initialState
			localStorage.clear()
			location.href = '/'
		},
	},
	extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
export const { setAuthToken, setAuthLoginType, logOutUser } = authSlice.actions

export default authSlice.reducer
