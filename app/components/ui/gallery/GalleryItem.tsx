import { FC } from 'react'

import Link from 'next/link'

import styles from './Gallery.module.scss'

import Image from 'next/image'

import { IGalleryItemProps } from '@/components/ui/gallery/gallery.interface'
import cn from 'classnames'

const GalleryItem: FC<IGalleryItemProps> = ({ item, vairant }) => {
	return (
		<Link
			href={item.link}
			className={cn(styles.item, {
				[styles.withText]: item.content,
				[styles.horizontal]: vairant === 'horizontal',
				[styles.vertical]: vairant === 'vertical'
			})}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				draggable={false}
				layout='fill'
				priority
			/>

			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>

					{item.content.subTitle && (
						<div className={styles.subTitle}>{item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	)
}

export default GalleryItem
