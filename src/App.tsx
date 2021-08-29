import RouterConfig from 'navigation/RouterConfig'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
			<Toaster />
		</div>
	)
}
