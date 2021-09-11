import { render } from 'utils/testUtils'
import Home from '../Home'

describe('<Home />', () => {
	it('should display landing page Tag Line', async () => {
		const { getByTestId } = render(<Home />)
		const landingPageTagLine = getByTestId('tagline')
		expect(landingPageTagLine.textContent).toBe(
			'A Decisive buddy for your Business.',
		)
	})
	it('should display Get Started Component', async () => {
		const { getByText } = render(<Home />)
		const landingPageGetStartedForm = getByText('Get Started')
		expect(landingPageGetStartedForm.textContent).toBe('Get Started')
	})
})
