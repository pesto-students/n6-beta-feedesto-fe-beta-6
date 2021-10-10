import GetStarted from '..'

import { render } from 'utils/testUtils'
import LoginUserWithGoogle from '../LoginUserWithGoogle'
import { LoginType } from 'types/enums'

describe('<GetStarted />', () => {
	it('should have google login button enabled', () => {
		const { getByTestId } = render(<GetStarted />)
		const continueButton = getByTestId('google-login')

		expect(continueButton.textContent).toBe('Continue with Google')
	})
})

describe('<LoginUserWithGoogle />', () => {
	it('should have choice for entity types', async () => {
		const mockProps = {
			handleLoginTypeChange: jest.fn(),
			handleLoginStepChange: jest.fn(),
			loginType: LoginType.USER,
		}
		const { getByLabelText } = render(
			<LoginUserWithGoogle {...mockProps} />,
		)
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
