import { FC } from 'react'
import GenresMenu from './genres/GenresMenu'
import Menu from './menu/Menu'
import { firstMenu, userMenu } from './menu_helpers/menu.data'

const MenuContainer: FC = () => {
	return (
		<div>
			{/*FIRST MENU */}

			<Menu menu={firstMenu} />
			{/*GENRES MENU */}

			<GenresMenu />

			{/*USER MENU */}

			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
