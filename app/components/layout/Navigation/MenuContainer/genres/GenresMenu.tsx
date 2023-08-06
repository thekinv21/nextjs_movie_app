import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'
import { FC } from 'react'
import Menu from '../menu/Menu'
import { usePopularGenres } from './usePopularGenres'

const GenresMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className='mx-11 mb-6'>
			<SkeletonLoader count={5} className='h-7 mt-6' />
		</div>
	) : (
		<Menu menu={{ title: 'Popular Genres', items: data || [] }} />
	)
}

export default GenresMenu
