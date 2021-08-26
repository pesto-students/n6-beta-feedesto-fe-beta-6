import { Link, useHistory } from 'react-router-dom'
import { ReactElement } from 'react'

export interface SidebarItemProps {
	label: string
	icon: ReactElement
	link: string
	classes?: string
}

const SidebarItem = (props: SidebarItemProps) => {
	const history = useHistory()
	const isCurrentRoute = history.location.pathname.startsWith(props.link)

	return (
		<div className="my-3">
			<Link
				to={props.link}
				className={
					'flex items-center rounded-lg px-3 py-3 no-underline transition-all duration-300' +
					(isCurrentRoute
						? ' bg-gray-700 text-gray-100'
						: ' text-gray-700 hover:bg-gray-200') +
					` ${props.classes}`
				}
			>
				<div>{props.icon}</div>
				<div className="font-semibold leading-5 pl-3">
					{props.label}
				</div>
			</Link>
		</div>
	)
}

export default SidebarItem
