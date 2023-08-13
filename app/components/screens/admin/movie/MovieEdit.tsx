import { FC } from 'react'
import { useForm } from 'react-hook-form'

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
import dynamic from 'next/dynamic'
import { Controller } from 'react-hook-form'
import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
	ssr: false
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues
	} = useForm<IMovieEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmitHandler } = useMovieEdit(setValue)
	const { isLoading: isActorsLoading, data: isActors } = useAdminActors()
	const { isLoading: isGenreLoading, data: isGenres } = useAdminGenres()

	return (
		<Meta title='Edit Movie'>
			<AdminNavigation />
			<Heading title='Edit Movie' />
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
								{...register('title', {
									required: 'Title is required!'
								})}
								placeholder='Title'
								error={errors.title}
								style={{ width: '31%' }}
							/>

							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('title')))
								}
								register={register}
								error={errors.title}
							/>

							<Field
								{...register('parameters.country', {
									required: 'Country is required!'
								})}
								placeholder='Country'
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parameters.year', {
									required: 'Year is required!'
								})}
								placeholder='Year'
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!'
								})}
								placeholder='Duration (min)'
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							{/* REACT SELECTS */}

							<Controller
								name='genres'
								control={control}
								render={({ field, fieldState: { error } }) => (
									// genre select

									<DynamicSelect
										field={field}
										options={isGenres || []}
										isLoading={isGenreLoading}
										placeholder='Genres'
										error={error}
										isMulti
									/>
								)}
								rules={{
									required: 'You must select one genre...'
								}}
							/>

							<Controller
								name='actors'
								control={control}
								render={({ field, fieldState: { error } }) => (
									// genre select

									<DynamicSelect
										field={field}
										options={isActors || []}
										isLoading={isActorsLoading}
										placeholder='Actors'
										error={error}
										isMulti
									/>
								)}
								rules={{
									required: 'You must select one actor...'
								}}
							/>

							<Controller
								name='poster'
								control={control}
								defaultValue=''
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									// poster upload

									<UploadField
										value={value}
										onChange={onChange}
										placeholder='Poster'
										error={error}
										folder='movies'
									/>
								)}
								rules={{
									required: 'Poster is Required'
								}}
							/>

							<Controller
								name='bigPoster'
								control={control}
								defaultValue=''
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									// big poster upload

									<UploadField
										value={value}
										onChange={onChange}
										placeholder='Big  poster'
										error={error}
										folder='movies'
									/>
								)}
								rules={{
									required: 'Big Poster is Required'
								}}
							/>

							<Controller
								name='videoUrl'
								control={control}
								defaultValue=''
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									// video upload

									<UploadField
										value={value}
										onChange={onChange}
										placeholder='Video'
										error={error}
										folder='movies'
										style={{ marginTop: '25px' }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is Required'
								}}
							/>
						</div>

						<Button className='mt-10 rounded-md'>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default MovieEdit
