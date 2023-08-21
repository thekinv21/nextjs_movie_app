import { FC } from 'react'

import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MoviesList'

const FavoriteMovieList: FC = () => {
	const { isLoading, favoriteMovies } = useFavorites()
	const { user } = useAuth()

	if (!user)
		return (
			<div className='mt-11 bg-gray-700 bg-opacity-20 py-5 px-5 text-xs rounded-lg text-white text-opacity-80 text-center uppercase'>
				For viewing favorites plz autorize!
			</div>
		)

	return isLoading ? (
		<div className='mt-11'>
			<SkeletonLoader count={3} className='h-28 mb-4' />
		</div>
	) : (
		<MovieList
			link='/favorites'
			movies={favoriteMovies?.slice(0, 2) || []}
			title='Favorites'
		/>
	)
}

export default FavoriteMovieList
