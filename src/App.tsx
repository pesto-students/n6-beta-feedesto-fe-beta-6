import withErrorHandler from 'errorBoundary'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import RouterConfig from 'navigation/RouterConfig'
import { Routes } from 'navigation/routes'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store'
import { setAuthLoginType, setAuthToken } from 'store/modules/auth/authSlice'
import { fetchUserDetails, setCurrentUser } from 'store/modules/user/userSlice'
import { LoginType } from 'types/enums'
import { User } from 'types/models/user'

TimeAgo.addDefaultLocale(en)

function App() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { auth } = useSelector((state: RootState) => state)

	const checkLocalAuthentication = async () => {
		const token = localStorage.getItem('token')
		const loginType = localStorage.getItem('loginType')
		if (token && loginType) {
			dispatch(setAuthToken(token))
			dispatch(setAuthLoginType(loginType as LoginType))

			const [user]: User[] | undefined = await fetchUserDetails()
			if (user) {
				dispatch(setCurrentUser(user))
				history.push(Routes.ADMIN_USERS)
			} else {
				toast.error('Some error occured while finding user')
			}
		} else {
			if (history.location.pathname != '/') {
				history.push('/')
			}
		}
	}

	useEffect(() => {
		checkLocalAuthentication()
	}, [auth.authToken])

	return (
		<>
			<RouterConfig />
			<Toaster toastOptions={{ position: 'bottom-right' }} />
		</>
	)
}

const AppComp = withErrorHandler(App)
export default AppComp
