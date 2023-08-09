import { ChangeEvent, FC } from 'react'

import SearchField from '@/ui/search-field/SearchField'

import AdminCreateButton from '../AdminCreateButton/AdminCreateButton'

import styles from './AdminHeader.module.scss'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
	searchTerm,
	handleSearch,
	onClick
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	)
}

export default AdminHeader
