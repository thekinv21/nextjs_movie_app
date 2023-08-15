import Meta from '@/utils/meta/Meta'

import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'

import Heading from '@/ui/heading/Heading'

import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import { useUsers } from './useUsers'

const Users: FC = () => {
	const {
		handleSearch,
		searchTerm,
		isLoading,
		data,
		deleteAsync,
		createAsync
	} = useUsers()

	return (
		<Meta title='Admin || Users'>
			<AdminNavigation />

			<Heading title='All Users Data' />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				// onClick={createAsync}
			/>

			<AdminTable
				tableItems={data || []}
				headerItems={['Email', 'User Register At']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default Users
