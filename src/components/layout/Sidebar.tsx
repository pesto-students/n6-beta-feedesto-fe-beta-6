import { Box, Image } from '@chakra-ui/react'
import * as Icons from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { logOutUser } from 'store/modules/auth/authSlice'
import SidebarItem, { SidebarItemProps } from './SidebarItem'

const Sidebar = ({ items }: { items: SidebarItemProps[] }) => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state)

	const handleLogOut = () => {
		dispatch(logOutUser())
	}
	return (
		<Box alignSelf="center">
			<div className="w-full text-center p-4">
				<Image alt="Feedesto Logo" src="/feedesto-logo.png"></Image>
				<div className="font-semibold p-2">
					<div>{user.currentUser.name}</div>
					<div className="font-normal text-sm text-gray-700">
						{user.currentUser.organization?.name}
					</div>
				</div>
				<div className="my-2">
					{items.map((item, index) => (
						<SidebarItem {...item} key={index} />
					))}
					<div className="my-3" onClick={() => handleLogOut()}>
						<div className="flex items-center rounded-lg px-3 py-3 no-underline transition-all duration-300 text-red-700 hover:bg-red-100 cursor-pointer">
							<div>
								<Icons.ArrowBarRight size={24} />
							</div>
							<div className="font-semibold leading-5 pl-3">
								Logout
							</div>
						</div>
					</div>
				</div>
			</div>
		</Box>
	)
}

export default Sidebar
