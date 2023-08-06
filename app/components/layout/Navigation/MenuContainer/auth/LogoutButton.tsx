import { FC, MouseEvent } from 'react'

import { useActions } from '@/hooks/useActions'

import MaterialIcon from '@/ui/icons/MaterialIcon'
import { useRouter } from 'next/router'

const LogoutButton: FC = () => {
	const { logout } = useActions()

	const { replace } = useRouter()

	const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()

		replace('/auth')
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
