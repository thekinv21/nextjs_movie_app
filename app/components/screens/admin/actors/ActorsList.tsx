import Meta from '@/utils/meta/Meta'

import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'

import Heading from '@/ui/heading/Heading'
import { useActors } from './useActors'

import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'

const Actors: FC = () => {
	const {
		handleSearch,
		searchTerm,
		data,
		isLoading,
		deleteAsync,
		createAsync
	} = useActors()

	return (
		<Meta title='Admin || Actors'>
			<AdminNavigation />

			<Heading title='All Actors' />

			<AdminHeader
				onClick={createAsync}
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>

			<AdminTable
				tableItems={data || []}
				headerItems={['Actor Name', 'Slug', 'Moviess Count']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default Actors
