import { FC } from 'react'

import MaterialIcon from '../MaterialIcon'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: any) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name='MdSearch' />
			<input
				placeholder='Search Movie'
				value={searchTerm}
				onChange={handleSearch}
			/>
		</div>
	)
}

export default SearchField
