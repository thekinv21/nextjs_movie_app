import { FC } from 'react'

import SearchField from '@/ui/search-field/SearchField'

import styles from './Search.module.scss'

import SearchList from './Searchlist/SearchList'

import { useSearch } from './useSearch'

const Search: FC = () => {
	const { data, isSuccess, handleSearch, searchTerm } = useSearch()

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
