import Meta from '@/utils/meta/Meta'

import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'

import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'

import Heading from '@/ui/heading/Heading'

import { useGenres } from './useGenres'

const Genres: FC = () => {
	const { handleSearch, searchTerm, data, isLoading, deleteAsync } = useGenres()

	return (
		<Meta title='Admin || Genres'>
			<AdminNavigation />

			<Heading title='All Genres' />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

			<AdminTable
				tableItems={data || []}
				headerItems={['Genres', 'Slug']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default Genres
