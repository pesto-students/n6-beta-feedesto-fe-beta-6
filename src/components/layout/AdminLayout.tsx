import { Routes } from 'navigation/routes'
import * as Icon from 'react-bootstrap-icons'
import Sidebar from './Sidebar'
import { SidebarItemProps } from './SidebarItem'

const AdminLayout = ({ children, ...args }: any) => {
	const sidebarItems: SidebarItemProps[] = [
		{
			label: 'Users',
			icon: <Icon.People size={24} />,
			link: Routes.ADMIN_USERS,
		},
		{
			label: 'Discussions',
			icon: <Icon.ChatText size={24} />,
			link: Routes.ADMIN_DISCUSSIONS,
		},
		{
			label: 'Super Admin',
			icon: <Icon.Bank size={24} />,
			link: Routes.SUPER_ADMIN_USERS,
			tooltipText: 'For demo purposes only',
		},
	]
	return (
		<div>
			<div className="flex flex-row h-screen overflow-y-hidden">
				<div className="w-1/5 h-full overflow-y-auto flex flex-col justify-start bg-gray-100">
					<Sidebar items={sidebarItems}></Sidebar>
				</div>
				<div className="h-full w-full overflow-y-auto">{children}</div>
			</div>
		</div>
	)
}

export default AdminLayout
