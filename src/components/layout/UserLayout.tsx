import {
	Avatar,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { logOutUser } from 'store/modules/auth/authSlice'

const UserLayout = ({ children, ...args }: any) => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state)

	return (
		<div>
			<div className="px-12 bg-gray-100 fixed top-0 z-10 left-0 right-0 shadow-lg h-20">
				<div className="h-full flex items-center justify-between">
					<Image
						className="h-14"
						src="/feedesto.svg"
						alt="Feedesto Logo"
					/>
					<Menu closeOnBlur closeOnSelect>
						<MenuButton
							className="bg-gray-200 hover:bg-gray-300 transition-all duration-300 cursor-pointer px-3 py-2 rounded-lg shadow-md"
							aria-label="Options"
						>
							<div className="flex items-center gap-x-2">
								<div className="text-gray-800 font-semibold mx-2">
									{user.currentUser.name}
								</div>
								<Avatar
									backgroundColor="gray.300"
									size="sm"
									className="shadow"
									src={user.currentUser.googleAvatarUrl}
									icon={
										!user.currentUser.googleAvatarUrl ? (
											<Icon.PersonFill
												size={16}
												className="text-gray-500"
											/>
										) : undefined
									}
								></Avatar>
							</div>
						</MenuButton>
						<MenuList className="bg-gray-500">
							<div>
								<MenuItem
									icon={<Icon.ArrowBarRight />}
									color="red"
									onClick={() => dispatch(logOutUser())}
								>
									Logout
								</MenuItem>
							</div>
						</MenuList>
					</Menu>
				</div>
			</div>
			<div className="h-screen flex flex-col  overflow-y-hidden">
				<div className="flex flex-none h-20"></div>
				<div className="flex-1">{children}</div>
			</div>
		</div>
	)
}

export default UserLayout
