import { IconButton, Tooltip } from '@chakra-ui/react'
import classNames from 'classnames'
import { ReactElement } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { Link, useHistory } from 'react-router-dom'

export interface SidebarItemProps {
	label: string
	icon: ReactElement
	link: string
	tooltipText?: string
	classes?: string
}

const SidebarItem = (props: SidebarItemProps) => {
	const history = useHistory()
	const isCurrentRoute = history.location.pathname.startsWith(props.link)

	return (
		<div className="my-3">
			<Link
				to={props.link}
				className={classNames(
					'flex justify-between items-center rounded-lg px-3 py-3 no-underline transition-all duration-300',
					isCurrentRoute
						? ' bg-gray-700 text-gray-100'
						: ' text-gray-700 hover:bg-gray-200',
					`${props.classes}`,
				)}
			>
				<div className="flex items-center">
					<div>{props.icon}</div>
					<div className="font-semibold leading-5 pl-3">
						{props.label}
					</div>
				</div>
				{props.tooltipText ? (
					<div>
						<Tooltip label="For demo purposes only">
							<IconButton
								rounded="full"
								aria-label="info"
								size="xs"
								bgColor={
									isCurrentRoute ? 'gray.600' : 'gray.200'
								}
								_hover={{
									bgColor: isCurrentRoute
										? 'gray.700'
										: 'gray.300',
								}}
								icon={<Icon.InfoCircleFill />}
							/>
						</Tooltip>
					</div>
				) : null}
			</Link>
		</div>
	)
}

export default SidebarItem
