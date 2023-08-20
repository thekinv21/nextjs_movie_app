import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/components/ui/banner/Banner'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import Heading from '@/components/ui/heading/Heading'

import { IMovie } from '@/shared/types/movie.types'

import Meta from '@/utils/meta/Meta'

import Content from './Content/Content'
import { useUpdateCountOpened } from './RateMovie/useUpdateCountOpened'

const DynamicGallery = dynamic(
	() => import('@/components/ui/gallery/Gallery'),
	{
		ssr: false
	}
)

const DynamicVideoPlayer = dynamic(
	() => import('@/ui/video-player/VideoPlayer'),
	{
		ssr: false
	}
)
const DynamicRating = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false
})

const SingleMovie: FC<{ movie: IMovie; similarMovies: IGalleryItem[] }> = ({
	similarMovies,
	movie
}) => {
	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={String(movie?.title)} description={`Watching ${movie?.title}`}>
			<Banner
				image={String(movie?.bigPoster)}
				Detail={() => <Content movie={movie} />}
			/>

			{/** Video Player */}

			<DynamicVideoPlayer slug={movie.slug} videoSources={movie.videoUrl} />

			<div className='mt-12'>
				<Heading title='Similar Movies' />

				<DynamicGallery items={similarMovies} />
			</div>

			{/** Ratings */}

			<DynamicRating slug={movie.slug} id={movie._id} />
		</Meta>
	)
}

export default SingleMovie
