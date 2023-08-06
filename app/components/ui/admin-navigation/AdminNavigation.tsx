import { FC } from 'react'

import { navItems } from './admin-navigation.data'

import styles from './AdminNavigation.module.scss'
import AdminNavigationItem from './AdminNavigationItem'

const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map(item => (
					<AdminNavigationItem navItem={item} key={item.link} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNavigation
