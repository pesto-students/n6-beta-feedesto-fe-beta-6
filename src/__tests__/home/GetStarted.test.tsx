import React from 'react'
import { render } from '../../../utils/test-utils'
import EntityTypeInput from '../../app/features/home/GetStarted/EntityTypeInput'
import GetStarted from '../../app/features/home/GetStarted/GetStarted'

describe('<GetStarted />', () => {
	it('should have google login button enabled', () => {
		const mockProps = {
			onLoginSuccess: jest.fn(),
			onLoginFailure: jest.fn(),
		}
		const { getByTestId } = render(<GetStarted {...mockProps} />)
		const continueButton = getByTestId('google-login')

		expect(continueButton.textContent).toBe('Continue with Google')
	})
})

describe('<EntityTypeInput />', () => {
	it('should have choice for entity types', async () => {
		const mockProps = {
			onLoginSuccess: jest.fn(),
			onLoginFailure: jest.fn(),
		}
		const { getByLabelText } = render(<EntityTypeInput {...mockProps} />)
		let entityTypeRadioButtonUser = getByLabelText('User')
		let entityTypeRadioButtonOrganization = getByLabelText('Organization')

		let isUserChecked =
			entityTypeRadioButtonUser.attributes.getNamedItem('checked')
		let isOrganizationChecked =
			entityTypeRadioButtonOrganization.attributes.getNamedItem('checked')

		expect(isUserChecked).toBeTruthy()
		expect(isOrganizationChecked).toBeFalsy()
	})
})
