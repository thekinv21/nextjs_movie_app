import { FC } from 'react'
import { Controller } from 'react-hook-form'

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AuthFields from '../../auth/auth-field/AuthFields'

import { useUserEdit } from './useUserEdit'

const UserEdit: FC = () => {
	const {
		isLoading,
		register,
		formState,
		handleSubmit,
		onSubmitEdit,
		control
	} = useUserEdit()

	return (
		<Meta title='Edit user'>
			<AdminNavigation />
			<Heading title='Edit user' />
			<form onSubmit={handleSubmit(onSubmitEdit)} className='admin-form'>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							control={control}
							name='isAdmin'
							render={({ field }) => (
								<Button
									className='mr-5'
									onClick={e => {
										e.preventDefault(), field.onChange(!field.value)
									}}
								>
									{field.value ? 'Make it regular user' : 'Make is Admin'}
								</Button>
							)}
						></Controller>

						<Button className='mt-10 rounded-md'>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
