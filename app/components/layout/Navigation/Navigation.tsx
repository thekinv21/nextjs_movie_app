import { FC } from 'react'
import styles from './Navigation.module.scss'

import Logo from './Logo/Logo'

import MenuContainer from './MenuContainer/MenuContainer'

const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Logo />

			<MenuContainer />
		</div>
	)
}

export default Navigation
