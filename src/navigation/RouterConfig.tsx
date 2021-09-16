import Discussions from 'pages/admin/discussions/Discussions'
import DiscussionResults from 'pages/admin/discussions/results/DiscussionResults'
import Users from 'pages/admin/users/Users'
import DiscussionView from 'pages/admin/discussions/DiscussionView'
import Home from 'pages/home/Home'
import { Route, Switch } from 'react-router-dom'
import OrganizationPrivateRoute from './OrganizationPrivateRoute'
import { Routes } from './routes'
import UserPrivateRoute from './UserPrivateRoute'

const RouterConfig = () => {
	return (
		<Switch>
			<Route exact component={Home} path={Routes.ROOT} />
			<UserPrivateRoute exact path={Routes.DASHBOARD}>
				<Discussions isAdmin={false} />
			</UserPrivateRoute>
			<UserPrivateRoute path={Routes.DASHBOARD_DISCUSSION + '/:id'}>
				<DiscussionView />
			</UserPrivateRoute>
			<OrganizationPrivateRoute exact path={Routes.ADMIN_USERS}>
				<Users isSuperAdmin={false} />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute exact path={Routes.SUPER_ADMIN_USERS}>
				<Users isSuperAdmin={true} />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute exact path={Routes.ADMIN_DISCUSSIONS}>
				<Discussions isAdmin={true} />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute
				exact
				path={Routes.ADMIN_DISCUSSION_RESULTS + '/:id'}
			>
				<DiscussionResults />
			</OrganizationPrivateRoute>
		</Switch>
	)
}

export default RouterConfig
