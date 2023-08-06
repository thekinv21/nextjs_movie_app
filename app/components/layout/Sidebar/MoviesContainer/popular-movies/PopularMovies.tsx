import { FC } from 'react'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { MovieService } from '@/services/movie.service'

import { useQuery } from 'react-query'
import MoviesList from '../movies-list/MoviesList'

const PopularMovies: FC = () => {
	const { data: popularMovies, isLoading } = useQuery(
		['Get Popular movies in sidebar'],
		() => MovieService.getPopularMovies()
	)

	return isLoading ? (
		<div className='mt-11'>
			<SkeletonLoader count={3} className='h-28 mb-4' />
		</div>
	) : (
		<MoviesList
			link='/trending'
			movies={popularMovies || []}
			title='Popular Movies'
		/>
	)
}

export default PopularMovies
