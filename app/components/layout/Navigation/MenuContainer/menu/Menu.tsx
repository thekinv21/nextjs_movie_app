import { FC } from 'react'
import { IMenu } from '../menu_helpers/menu.interface'

import dynamic from 'next/dynamic'

import styles from './Menu.module.scss'

import MenuItem from './MenuItem'
const DynamicAuthItems = dynamic(() => import('../auth/AuthItems'), {
	ssr: false
})

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
	return (
		<section className={styles.menu}>
			<div className={styles.heading}>{title}</div>

			<ul className={styles.ul}>
				{items.map(item => (
					<MenuItem key={item.link} item={item} />
				))}

				{title === 'General' ? <DynamicAuthItems /> : null}
			</ul>
		</section>
	)
}

export default Menu
