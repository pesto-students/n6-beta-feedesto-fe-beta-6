import React from 'react'

import { bugsnagClient } from './configs/bugsnag'

const withErrorHandler = (WrappedComponent) => {
	class WithErrorHandler extends React.Component {
		constructor(props) {
			super(props)
			this.state = { hasError: false }
		}

		componentDidCatch(error, info) {
			// Display fallback UI
			this.setState({ hasError: true })
			bugsnagClient.notify(error)
		}

		render() {
			if (this.state.hasError) {
				// You can render any custom fallback UI
				return (
					<div className="errorPageBody">
						<div>
							Hey! Something doesn&apos;t feel right here.
							<br />
							Try going back and see if you can continue your
							work!
						</div>
					</div>
				)
			}
			return <WrappedComponent {...this.props} />
		}
	}
	WithErrorHandler.displayName = `withErrorHandler(${WrappedComponent.displayName})`
	return WithErrorHandler
}

export default withErrorHandler
