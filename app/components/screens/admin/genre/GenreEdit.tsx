import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'
import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

import formStyles from '@/components/ui/admin/adminForm.module.scss'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false
	}
)

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues
	} = useForm<IGenreEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmitHandler } = useGenreEdit(setValue)

	return (
		<Meta title='Edit genre'>
			<AdminNavigation />
			<Heading title='Edit genre' />
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

							<div style={{ width: '31%' }}>
								<SlugField
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
									register={register}
									error={errors.slug}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required!'
								})}
								placeholder='Icon'
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							name='description'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<DynamicTextEditor
									placeholder='Description'
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: v =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required!'
								}
							}}
						/>
						<Button className='mt-10 rounded-md'>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
