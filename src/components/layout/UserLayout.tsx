import { DISCUSSIONS, USERS } from 'navigation/routes'
import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Sidebar from './Sidebar'
import { SidebarItemProps } from './SidebarItem'

const UserLayout = ({ children, ...args }: any) => {
	return <div>{children}</div>
}

export default UserLayout
