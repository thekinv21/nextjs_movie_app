import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

import formStyles from '@/components/ui/admin/adminForm.module.scss'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import UploadField from '@/components/ui/form-elements/UploadFeald/UploadField'
import { Controller } from 'react-hook-form'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues
	} = useForm<IActorEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmitHandler } = useActorEdit(setValue)

	return (
		<Meta title='Edit Actor'>
			<AdminNavigation />
			<Heading title='Edit Actor' />
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className={formStyles.form}
			>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!'
								})}
								placeholder='Name'
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
								register={register}
								error={errors.slug}
							/>
						</div>
						<Controller
							name='photo'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								// file photo upload

								<UploadField
									value={value}
									onChange={onChange}
									placeholder='Upload Image'
									error={error}
									folder='actors'
								/>
							)}
							rules={{
								required: 'Photo is Required'
							}}
						/>
						<Button className='mt-10 rounded-md'>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
