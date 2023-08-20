import dynamic from 'next/dynamic'
import { FC } from 'react'

import PopularMoviesList from './PopularMovieList/PopularMoviesList'

const DynamicFavoriteMovieList = dynamic(
	() => import('./FavoriteMovieList/FavoriteMovieList'),
	{ ssr: false }
)

const MoviesContainer: FC = () => {
	return (
		<section>
			<PopularMoviesList />
			<DynamicFavoriteMovieList />
		</section>
	)
}

export default MoviesContainer
