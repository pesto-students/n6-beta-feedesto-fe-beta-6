import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from 'store'
import { LoginType } from 'types/enums'
import { APP, ROOT } from './routes'

const OrganizationRoute = ({ children, ...args }: any) => {
	const { auth } = useSelector((state: RootState) => state)
	return (
		<Route
			{...args}
			render={({ location }) =>
				auth.isAuthenticated ? (
					auth.loginType === LoginType.ORGANISATION ? (
						<>
							<div>{auth.isAuthenticated}</div>
							{args.children}
						</>
					) : (
						<Redirect
							to={{
								pathname: APP,
								state: { from: location },
							}}
						/>
					)
				) : (
					<Redirect
						to={{
							pathname: ROOT,
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

export default OrganizationRoute
