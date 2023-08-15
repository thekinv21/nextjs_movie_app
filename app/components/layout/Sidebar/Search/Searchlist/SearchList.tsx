import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import Link from 'next/link'

import styles from './SearchList.module.scss'

import { getMovieUrl } from '@/config/url.config'
import Image from 'next/image'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map(movie => (
					<Link key={movie._id} href={getMovieUrl(movie.slug)}>
						<Image
							src={movie.poster}
							width={50}
							height={50}
							alt={movie.title}
							objectFit='cover'
							objectPosition='top'
							draggable={false}
						/>

						<p>{movie.title}</p>
					</Link>
				))
			) : (
				<div className='text-white text-center py-4'>Movies not Found..</div>
			)}
		</div>
	)
}

export default SearchList
