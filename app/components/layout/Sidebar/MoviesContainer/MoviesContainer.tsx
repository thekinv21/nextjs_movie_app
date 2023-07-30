import { FC } from 'react'
import FavoriteMovies from './favorite-movies/FavoriteMovies'
import PopularMovies from './popular-movies/PopularMovies'

const MoviesContainer: FC = () => {
	return (
		<section>
			<PopularMovies />
			<FavoriteMovies />
		</section>
	)
}

export default MoviesContainer
