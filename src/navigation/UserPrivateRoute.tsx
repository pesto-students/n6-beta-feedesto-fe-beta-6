import UserLayout from 'components/layout/UserLayout'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from 'store'
import { Routes } from './routes'

const UserPrivateRoute = ({ children, ...args }: any) => {
	const { auth } = useSelector((state: RootState) => state)

	return (
		<Route
			{...args}
			render={({ location }) =>
				auth.isAuthenticated ? (
					<UserLayout>{children}</UserLayout>
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

export default UserPrivateRoute
