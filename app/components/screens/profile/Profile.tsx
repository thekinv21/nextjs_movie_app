import { FC } from 'react'

import Button from '@/components/ui/form-elements/Button'
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AuthFields from '../auth/auth-field/AuthFields'

import styles from './Profile.module.scss'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { isLoading, register, formState, handleSubmit, onSubmitUpdate } =
		useProfile()

	return (
		<Meta title='Profile Edit'>
			<Heading title='My Profile' className='mb-6' />
			<form onSubmit={handleSubmit(onSubmitUpdate)}>
				{/* fields */}

				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields
						formState={formState}
						register={register}
						isPasswordRequired={false}
					/>
				)}

				<div className={styles.buttons}>
					<Button type='submit' disabled={isLoading}>
						Update Profile
					</Button>
				</div>
			</form>
		</Meta>
	)
}

export default Profile
