import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { Component } from 'react'
import * as Icons from 'react-bootstrap-icons'
import SidebarItem, { SidebarItemProps } from './SidebarItem'

class Sidebar extends Component<{ items: SidebarItemProps[] }> {
	render() {
		return (
			<Box alignSelf="center">
				<div className="w-full text-center p-4">
					<Image alt="Feedesto Logo" src="/feedesto-logo.png"></Image>
					<div className="font-semibold p-2 text-sm text-gray-100">
						Admin
					</div>
					<div className="my-2">
						{this.props.items.map((item, index) => (
							<SidebarItem {...item} key={index} />
						))}
						<SidebarItem
							label="Logout"
							icon={<Icons.ArrowBarRight size={24} />}
							link="/logout"
							classes="text-red-700 hover:bg-red-100"
						/>
					</div>
				</div>
			</Box>
		)
	}
}

export default Sidebar
