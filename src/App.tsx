import RouterConfig from 'navigation/RouterConfig'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
	return (
		<BrowserRouter>
			<RouterConfig />
		</BrowserRouter>
	)
}
