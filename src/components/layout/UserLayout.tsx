import {
	AddIcon,
	EditIcon,
	ExternalLinkIcon,
	HamburgerIcon,
	RepeatIcon,
} from '@chakra-ui/icons'
import {
	Avatar,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { logOutUser } from 'store/modules/auth/authSlice'

const UserLayout = ({ children, ...args }: any) => {
	const dispatch = useDispatch()

	useEffect(() => {
		// Fetch User detail here
	}, [])
	return (
		<div>
			<div className="py-4 px-12 bg-gray-100 shadow-lg">
				<div className="flex items-center justify-between">
					<Image
						className="h-14"
						src="/feedesto.svg"
						alt="Feedesto Logo"
					/>
					<Menu closeOnBlur closeOnSelect>
						<MenuButton aria-label="Options">
							<div className="bg-gray-200 hover:bg-gray-300 transition-all duration-300 cursor-pointer px-3 py-2 rounded-lg">
								<div className="flex items-center gap-x-2">
									<div className="text-gray-800 font-semibold mx-2">
										Harshit
									</div>
									<Avatar
										backgroundColor="gray.300"
										size="sm"
										icon={
											<Icon.PersonFill
												size={16}
												className="text-gray-500"
											/>
										}
									></Avatar>
								</div>
							</div>
						</MenuButton>
						<MenuList>
							<MenuItem
								icon={<Icon.ArrowBarRight />}
								color="red"
								onClick={() => dispatch(logOutUser())}
							>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</div>
			{children}
		</div>
	)
}

export default UserLayout
