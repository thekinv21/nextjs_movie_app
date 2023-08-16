import { FC } from 'react'

import { ICatalog } from './catalog.interace'

import { getMovieUrl } from '@/config/url.config'
import Meta from '@/utils/meta/Meta'
import GalleryItem from '../gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'
import styles from './Catalog.module.scss'

const Catalog: FC<ICatalog> = ({ title, movies, description }) => {
	return (
		<Meta description={description} title={title}>
			<Heading title={title} className={styles.heading} />

			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.length ? (
					movies.map(movie => (
						<GalleryItem
							key={movie._id}
							item={{
								name: movie.title,
								link: getMovieUrl(movie.slug),
								posterPath: movie.bigPoster,
								content: {
									title: movie.title
								}
							}}
							vairant='horizontal'
						/>
					))
				) : (
					<div>Not Found...</div>
				)}
			</section>
		</Meta>
	)
}

export default Catalog
