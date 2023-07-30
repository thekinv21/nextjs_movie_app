import { FC } from 'react'

import MoviesContainer from './MoviesContainer/MoviesContainer'
import Search from './Search/Search'
import styles from './Sidebar.module.scss'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			{/* MOVİES SEARCH */}
			<Search />

			{/* MOVİES CONTAİNER */}

			<MoviesContainer />
		</div>
	)
}

export default Sidebar
