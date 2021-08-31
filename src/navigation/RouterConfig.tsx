import Discussions from 'pages/admin/discussions/Discussions'
import Home from 'pages/home/Home'
import Users from 'pages/admin/users/Users'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { logOutUser } from 'store/modules/auth/authSlice'
import OrganizationPrivateRoute from './OrganizationPrivateRoute'
import {
	ADMIN_DISCUSSIONS,
	ADMIN_USERS,
	DASHBOARD,
	DASHBOARD_DISCUSSION,
	ROOT,
} from './routes'
import UserPrivateRoute from './UserPrivateRoute'
import AppPage from 'pages/dashboard/Dashboard'
import DiscussionPage from 'pages/dashboard/discussion/Discussion'

const RouterConfig = () => {
	const dispatch = useDispatch()
	return (
		<Switch>
			<Route exact component={Home} path={ROOT} />
			<UserPrivateRoute exact path={DASHBOARD}>
				<AppPage />
			</UserPrivateRoute>
			<UserPrivateRoute path={DASHBOARD_DISCUSSION + '/:id'}>
				<DiscussionPage />
			</UserPrivateRoute>
			<OrganizationPrivateRoute exact path={ADMIN_USERS}>
				<Users />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute exact path={ADMIN_DISCUSSIONS}>
				<Discussions />
			</OrganizationPrivateRoute>
		</Switch>
	)
}

export default RouterConfig
