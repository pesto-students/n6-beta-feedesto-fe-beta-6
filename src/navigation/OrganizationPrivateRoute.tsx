import AdminLayout from 'components/layout/AdminLayout'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from 'store'
import { LoginType } from 'types/enums'
import { Routes } from './routes'

const OrganizationPrivateRoute = ({ children, ...args }: any) => {
	const { auth } = useSelector((state: RootState) => state)
	const isAuthenticated = auth.authToken
	return (
		<Route
			{...args}
			render={({ location }) =>
				isAuthenticated ? (
					auth.loginType === LoginType.ORGANIZATION ? (
						<AdminLayout>
							<>{children}</>
						</AdminLayout>
					) : (
						<Redirect
							to={{
								pathname: Routes.DASHBOARD,
								state: { from: location },
							}}
						/>
					)
				) : (
					<Redirect
						to={{
							pathname: Routes.ROOT,
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

export default OrganizationPrivateRoute
