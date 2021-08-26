import { ChakraProvider } from '@chakra-ui/react'
import { render, RenderOptions } from '@testing-library/react'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../src/app/store'
import theme from '../src/app/theme'

const AllTheProviders: FC = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>{children}</Provider>
		</ChakraProvider>
	)
}

const customRender = (ui: ReactElement, options?: RenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options })

// test utils file
const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route)

	return customRender(ui, { wrapper: BrowserRouter })
}

export * from '@testing-library/react'
export { customRender as render, renderWithRouter }
