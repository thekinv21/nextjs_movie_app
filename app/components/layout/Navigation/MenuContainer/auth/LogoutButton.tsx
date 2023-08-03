import { FC, MouseEvent } from 'react'

import { useActions } from '@/hooks/useActions'

import MaterialIcon from '@/components/ui/MaterialIcon'

const LogoutButton: FC = () => {
	const { logout } = useActions()

	const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
	}

	return (
		<li>
			<a onClick={logoutHandler}>
				<MaterialIcon name='MdLogout' />
				<span>Logout</span>
			</a>
		</li>
	)
}

export default LogoutButton
