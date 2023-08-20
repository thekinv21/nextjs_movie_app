import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { MovieService } from '@/services/movies/movie.service'

import { getRandoms } from '@/utils/helper/randomElements'

import MoviesList from '../MoviesList'

const PopularMoviesList: FC = () => {
	const { data: popularMovies, isLoading } = useQuery(
		['Get Popular movies in sidebar'],
		() => MovieService.getPopularMovies(),
		{
			select: data => {
				const randomPopulars = [...data]

				getRandoms(randomPopulars)

				return randomPopulars.slice(0, 5)
			}
		}
	)

	return isLoading ? (
		<div className='mt-11'>
			<SkeletonLoader count={3} className='h-28 mb-4' />
		</div>
	) : (
		<MoviesList
			link='/trending'
			movies={popularMovies?.slice(0, 5) || []}
			title='Popular Movies'
		/>
	)
}

export default PopularMoviesList
