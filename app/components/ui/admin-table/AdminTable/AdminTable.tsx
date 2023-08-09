import { Pagination } from '@mantine/core'
import { FC, useState } from 'react'
import SkeletonLoader from '../../skeleton-loader/SkeletonLoader'
import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import { ITableItem } from './admin-table.interface'

interface IAdminTable {
	tableItems: ITableItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler: (id: string) => void
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
	removeHandler
}) => {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = tableItems.slice(indexOfFirstItem, indexOfLastItem)

	const total = tableItems.length / currentItems.length

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className='mt-4' />
			) : (
				<div>
					{currentItems.length ? (
						currentItems.map(tableItem => (
							<div key={tableItem._id}>
								<AdminTableItem
									tableItem={tableItem}
									removeHandler={removeHandler}
								/>
							</div>
						))
					) : (
						<div className={styles.notFound}>Users Not Found</div>
					)}

					<div className='flex justify-end items-center my-5'>
						<Pagination
							color='red'
							total={total}
							value={currentPage}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default AdminTable
