import { ChakraProvider } from '@chakra-ui/react'
import { render, RenderOptions } from '@testing-library/react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'store'
import theme from 'theme'
TimeAgo.addDefaultLocale(en)

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
