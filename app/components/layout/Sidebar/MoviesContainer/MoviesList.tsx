import Link from 'next/link'
import { FC } from 'react'

import { IMovieList } from './movie-list.interface'
import MovieItem from './MovieItem'
import styles from './MoviesList.module.scss'

const MoviesList: FC<IMovieList> = ({ link, title, movies }) => {
	return (
		<section className={styles.movielist}>
			<div className={styles.heading}>{title}</div>

			{movies.length ? (
				movies.map(movie => <MovieItem key={movie._id} movie={movie} />)
			) : (
				<div className=' my-3 py-3 px-4 rounded-lg bg-gray-800 text-center text-white text-sm'>
					Not Found..
				</div>
			)}

			<Link href={link}>
				<button className={styles.button}>See More</button>
			</Link>
		</section>
	)
}

export default MoviesList
