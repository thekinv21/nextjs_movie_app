import Link from 'next/link'
import { FC, Fragment } from 'react'

import styles from './ContentList.module.scss'

interface ILink {
	_id: string
	link: string
	title: string
}

interface IContentList {
	name: string
	links: ILink[]
}

const ContentList: FC<IContentList> = ({ links, name }) => {
	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}</div>
			<div className={styles.links}>
				{links.map((item, idx) => (
					<Fragment key={idx}>
						<Link href={item.link}>{item.title}</Link>
						{idx + 1 !== links.length ? ', ' : ''}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default ContentList
