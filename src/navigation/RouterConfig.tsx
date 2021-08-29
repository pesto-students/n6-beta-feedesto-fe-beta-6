import React from 'react'
import Discussions from 'pages/discussions/Discussions'
import Home from 'pages/home/Home'
import Users from 'pages/users/Users'
import { Route, Switch } from 'react-router-dom'
import { APP, DISCUSSIONS, ROOT, USERS } from './routes'
import OrganizationPrivateRoute from './OrganizationPrivateRoute'
import UserPrivateRoute from './UserPrivateRoute'
import { useDispatch } from 'react-redux'
import { logOutUser } from 'store/modules/auth/authSlice'

const RouterConfig = () => {
	const dispatch = useDispatch()
	return (
		<Switch>
			<Route exact component={Home} path={ROOT} />
			<UserPrivateRoute exact path={APP}>
				<div>User App Home</div>
				<div onClick={() => dispatch(logOutUser())}>Logout</div>
			</UserPrivateRoute>
			<OrganizationPrivateRoute exact path={USERS}>
				<Users />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute exact path={DISCUSSIONS}>
				<Discussions />
			</OrganizationPrivateRoute>
		</Switch>
	)
}

export default RouterConfig
