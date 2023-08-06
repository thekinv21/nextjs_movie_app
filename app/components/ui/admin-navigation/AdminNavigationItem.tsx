import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { INavItem } from './admin-navigation.interface'

import styles from './AdminNavigation.module.scss'

const AdminNavigationItem: FC<{ navItem: INavItem }> = ({ navItem }) => {
	const { asPath } = useRouter()

	return (
		<li>
			<Link
				href={navItem.link}
				className={cn({ [styles.active]: asPath === navItem.link })}
			>
				{navItem.title}
			</Link>
		</li>
	)
}

export default AdminNavigationItem
