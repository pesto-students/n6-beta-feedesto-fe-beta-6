import Discussions from 'pages/admin/discussions/Discussions'
import DiscussionResults from 'pages/admin/discussions/results/DiscussionResults'
import Users from 'pages/admin/users/Users'
import AppPage from 'pages/dashboard/Dashboard'
import DiscussionPage from 'pages/dashboard/discussion/Discussion'
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
				<AppPage />
			</UserPrivateRoute>
			<UserPrivateRoute path={Routes.DASHBOARD_DISCUSSION + '/:id'}>
				<DiscussionPage />
			</UserPrivateRoute>
			<OrganizationPrivateRoute exact path={Routes.ADMIN_USERS}>
				<Users isSuperAdmin={false} />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute exact path={Routes.SUPER_ADMIN_USERS}>
				<Users isSuperAdmin={true} />
			</OrganizationPrivateRoute>
			<OrganizationPrivateRoute exact path={Routes.ADMIN_DISCUSSIONS}>
				<Discussions />
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
