import withErrorHandler from 'errorBoundary'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import RouterConfig from 'navigation/RouterConfig'
import { useEffect } from 'react'
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

TimeAgo.addDefaultLocale(en)

function App() {
	const dispatch = useDispatch()

	const checkLocalAuthentication = () => {
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
	}

	useEffect(() => {
		checkLocalAuthentication()
	})

	return (
		<>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
			<Toaster toastOptions={{ position: 'bottom-right' }} />
		</>
	)
}

const AppComp = withErrorHandler(App)
export default AppComp
