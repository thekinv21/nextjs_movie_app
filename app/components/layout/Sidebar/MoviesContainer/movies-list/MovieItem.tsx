import { IMovie } from '@/shared/types/movie.types'
import { FC } from 'react'

import { getGenreUrl, getMovieUrl } from '@/config/url.config'

import Link from 'next/link'

import styles from './MoviesList.module.scss'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { getGenresListEach } from '@/utils/movie/getGenresList'

import Image from 'next/image'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<section className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					alt={movie.title}
					width={65}
					height={97}
					src={movie.poster}
					priority
				/>
			</Link>

			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link href={getGenreUrl(genre.slug)} key={genre._id}>
								{getGenresListEach(idx, movie.genres.length, genre.name)}
							</Link>
						))}
					</div>
				</div>

				<div className={styles.rating}>
					<MaterialIcon name='MdStarRate' />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</section>
	)
}

export default MovieItem
