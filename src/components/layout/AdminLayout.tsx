import { DISCUSSIONS, USERS } from 'navigation/routes'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Sidebar from './Sidebar'
import { SidebarItemProps } from './SidebarItem'

class AdminLayout extends React.Component<{ name?: string }> {
	sidebarItems: SidebarItemProps[] = [
		{
			label: 'Users',
			icon: <Icon.People size={24} />,
			link: USERS,
		},
		{
			label: 'Discussions',
			icon: <Icon.ChatText size={24} />,
			link: DISCUSSIONS,
		},
	]
	render() {
		return (
			<div>
				<div className="flex flex-row h-screen overflow-y-hidden">
					<div className="w-1/5 h-full overflow-y-auto flex flex-col justify-start bg-gray-100">
						<Sidebar items={this.sidebarItems}></Sidebar>
					</div>
					<div className="h-full w-full overflow-y-auto">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

export default AdminLayout
