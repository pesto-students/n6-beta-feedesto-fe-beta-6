import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ROOT } from './routes'

const PrivateRoute = ({ children, ...args }) => {
	let authorized = false

	return (
		<Route
			{...args}
			render={({ location }) =>
				authorized ? (
					<>
						{children}
						<br />
						<div>This is a protected route</div>
					</>
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

export default PrivateRoute
