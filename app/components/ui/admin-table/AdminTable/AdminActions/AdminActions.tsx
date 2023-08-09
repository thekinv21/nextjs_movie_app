import { FC } from 'react'

import MaterialIcon from '@/ui/icons/MaterialIcon'
import { useRouter } from 'next/router'
import styles from './AdminActions.module.scss'

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

const AdminActions: FC<IAdminActions> = ({ removeHandler, editUrl }) => {
	const { push } = useRouter()

	return (
		<div className={styles.actions}>
			<button title='Edit User' onClick={() => push(editUrl)}>
				<MaterialIcon name='MdEdit' />
			</button>

			<button title='Remove User' onClick={removeHandler}>
				<MaterialIcon name='MdDeleteOutline' />
			</button>
		</div>
	)
}

export default AdminActions
