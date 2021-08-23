import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { LoginType, SelectedTab } from '../../../types/enums'
import EntityTypeInput from './EntityTypeInput'
import OrganizationDetailInputs from './OrganizationDetailInputs'
import UserDetailInputs from './UserDetailInputs'

interface GetStartedComponentProps {
	onLoginSuccess: (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => void
	onLoginFailure: (response: GoogleLoginResponse) => void
}

const GetStarted = ({
	onLoginSuccess,
	onLoginFailure,
}: GetStartedComponentProps) => {
	let auth = useSelector((state: RootState) => state.auth)

	const activeEntityView =
		auth.loginType === LoginType.USER ? (
			<UserDetailInputs />
		) : (
			<OrganizationDetailInputs />
		)

	return (
		<div className="bg-gray-100 rounded-2xl ">
			<div>
				<div className="border-b border-gray-200 p-4 text-2xl font-semibold text-gray-600 text-center">
					Get Started
				</div>
				{auth.selectedTab === SelectedTab.GET_STARTED ? (
					<EntityTypeInput
						onLoginSuccess={onLoginSuccess}
						onLoginFailure={onLoginFailure}
					/>
				) : (
					activeEntityView
				)}
			</div>
		</div>
	)
}
export default GetStarted
