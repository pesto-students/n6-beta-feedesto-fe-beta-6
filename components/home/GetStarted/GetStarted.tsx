import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from 'store'
import { LoginType, SelectedTab } from 'types/enums'
import EntityTypeInput from './EntityTypeInput'
import OrganisationDetailInputs from './OrganisationDetailInputs'
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
		auth.loginType == LoginType.USER ? (
			<UserDetailInputs />
		) : (
			<OrganisationDetailInputs />
		)

	return (
		<div className="bg-gray-100 rounded-2xl ">
			<div>
				<div className="border-b border-gray-200 p-4 text-2xl font-semibold text-gray-500 text-center">
					Get Started
				</div>
				{auth.selectedTab == SelectedTab.GET_STARTED ? (
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
