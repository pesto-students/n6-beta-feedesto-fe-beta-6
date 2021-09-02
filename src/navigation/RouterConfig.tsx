import Discussions from 'pages/admin/discussions/Discussions'
import Users from 'pages/admin/users/Users'
import AppPage from 'pages/dashboard/Dashboard'
import DiscussionPage from 'pages/dashboard/discussion/Discussion'
import Home from 'pages/home/Home'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OrganizationPrivateRoute from './OrganizationPrivateRoute'
import {
	ADMIN_DISCUSSIONS,
	ADMIN_USERS,
	DASHBOARD,
	DASHBOARD_DISCUSSION,
	ROOT,
} from './routes'
import UserPrivateRoute from './UserPrivateRoute'

const RouterConfig = () => {
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
