import Meta from '@/utils/meta/Meta'

import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'

import Heading from '@/ui/heading/Heading'

import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

import { useMovies } from './useMovies'

const Movies: FC = () => {
	const {
		handleSearch,
		searchTerm,
		data,
		isLoading,
		deleteAsync,
		createAsync
	} = useMovies()

	return (
		<Meta title='Admin || Movies'>
			<AdminNavigation />

			<Heading title='All Movies' />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>

			<AdminTable
				tableItems={data || []}
				headerItems={['Movie Name', 'Genre', 'Rating']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default Movies
