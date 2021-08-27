import React from 'react'
import Discussions from 'pages/discussions/Discussions'
import Home from 'pages/home/Home'
import Users from 'pages/users/Users'
import { Route, Switch } from 'react-router-dom'
import { DISCUSSIONS, ROOT, USERS } from './routes'
import PrivateRoute from './PrivateRoute'

const RouterConfig = () => {
	return (
		<Switch>
			<Route exact component={Home} path={ROOT} />
			<PrivateRoute exact path={USERS}>
				<Users />
			</PrivateRoute>
			<PrivateRoute exact path={DISCUSSIONS}>
				<Discussions />
			</PrivateRoute>
		</Switch>
	)
}

export default RouterConfig
