import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Statistics from './Statistics/Statistics'

const Admin: FC = () => {
	return (
		<Meta title='Admin Panel'>
			<AdminNavigation />

			<Heading title='Some Statisticts' />

			<Statistics />
		</Meta>
	)
}

export default Admin
