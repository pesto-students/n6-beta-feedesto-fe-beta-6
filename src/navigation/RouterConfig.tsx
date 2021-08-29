import React from 'react'
import Discussions from 'pages/discussions/Discussions'
import Home from 'pages/home/Home'
import Users from 'pages/users/Users'
import { Route, Switch } from 'react-router-dom'
import { DISCUSSIONS, ROOT, USERS } from './routes'
import OrganizationPrivateRoute from './OrganizationPrivateRoute'

const RouterConfig = () => {
	return (
		<Switch>
			<Route exact component={Home} path={ROOT} />
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
