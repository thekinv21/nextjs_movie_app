import { FC } from 'react'

import PopularMovie from './PopularMovie'

import styles from '../Admin.module.scss'
import CountUsers from './CountUsers'

import { motion } from 'framer-motion'

const Statistics: FC = () => {
	return (
		<section className={styles.statisticts}>
			<motion.div
				className='w-full flex items-center justify-center'
				initial={{ opacity: 0, translateX: 200 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ ease: 'easeOut', duration: 0.5 }}
			>
				<CountUsers />
			</motion.div>

			<motion.div
				className='w-full flex items-center justify-center'
				initial={{ opacity: 0, translateX: -100 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ ease: 'easeOut', duration: 0.5 }}
			>
				<PopularMovie />
			</motion.div>
		</section>
	)
}

export default Statistics
