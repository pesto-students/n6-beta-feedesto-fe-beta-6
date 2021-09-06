import RouterConfig from 'navigation/RouterConfig'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {
	setAuthLoginType,
	setAuthToken,
	setIsAuthenticated,
	setIsGoogleLoggedIn,
} from 'store/modules/auth/authSlice'
import { LoginType } from 'types/enums'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(setAuthToken(token))
		}
		const loginType = localStorage.getItem('loginType')
		if (loginType) {
			dispatch(setAuthLoginType(loginType as LoginType))
		}
		if (token && loginType) {
			dispatch(setIsAuthenticated(true))
			dispatch(setIsGoogleLoggedIn(true))
		}
	})
	return (
		<div>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
			<Toaster />
		</div>
	)
}
