import { MovieService } from '@/services/movies/movie.service'

import { IMovie } from '@/shared/types/movie.types'

import { FC } from 'react'

import { useQuery } from 'react-query'

import cn from 'classnames'

import styles from '../Admin.module.scss'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { getMovieUrl } from '@/config/url.config'

import SubHeading from '@/ui/heading/SubHeading'

import Link from 'next/link'

import Image from 'next/image'

const PopularMovie: FC = () => {
	const { data: movie, isLoading } = useQuery(
		'Mostpopular movies',
		() => MovieService.getPopularMovies(),
		{
			select: (data): IMovie => data[0]
		}
	)

	return (
		<section className={cn(styles.block, styles.popular)}>
			<SubHeading title='The Most Popular Movie' />

			{isLoading ? (
				<SkeletonLoader className='h-48' />
			) : (
				movie && (
					<>
						<h3>This movie opened {movie.countOpened} times</h3>

						<Link href={getMovieUrl(movie.slug)}>
							<Image
								src={movie.bigPoster}
								alt={movie.title}
								draggable={false}
								width={285}
								height={176}
								className={styles.image}
								unoptimized // optimize etme
							/>
						</Link>
					</>
				)
			)}
		</section>
	)
}

export default PopularMovie
