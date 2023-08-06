import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IMenuItem } from '../menu_helpers/menu.interface'

import MaterialIcon from '@/ui/icons/MaterialIcon'
import Link from 'next/link'
import styles from './Menu.module.scss'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	// link aktive olup olmadığını karşılaştır
	// classnames kütüphanesini yükle

	const { asPath } = useRouter()

	return (
		<li
			className={cn({
				[styles.active]: asPath === item.link
			})}
		>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />

				<span>{item.title}</span>
			</Link>
		</li>
	)
}

export default MenuItem
