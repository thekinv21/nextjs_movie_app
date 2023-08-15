import { FC } from 'react'
import AdminActions from './AdminActions/AdminActions'
import { IAdminTableItem } from './admin-table.interface'

import styles from './AdminTable.module.scss'

import { motion } from 'framer-motion'

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<motion.div
			className={styles.item}
			initial={{ opacity: 0, translateY: 100 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ ease: 'easeOut', duration: 0.5 }}
		>
			{tableItem.items.map(value => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</motion.div>
	)
}

export default AdminTableItem
