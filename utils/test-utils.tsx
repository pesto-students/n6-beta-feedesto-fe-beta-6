import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../src/app/store'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import theme from '../src/app/theme'

Enzyme.configure({ adapter: new Adapter() })

const AllTheProviders: FC = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>{children}</Provider>
		</ChakraProvider>
	)
}

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
