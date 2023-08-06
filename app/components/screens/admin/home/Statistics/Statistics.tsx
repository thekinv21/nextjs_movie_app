import { FC } from 'react'

import PopularMovie from './PopularMovie'

import styles from '../Admin.module.scss'
import CountUsers from './CountUsers'

const Statistics: FC = () => {
	return (
		<section className={styles.statisticts}>
			<CountUsers />
			<PopularMovie />
		</section>
	)
}

export default Statistics
