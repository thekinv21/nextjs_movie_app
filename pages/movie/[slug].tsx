import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { getMovieUrl } from '@/config/url.config'

import { MovieService } from '@/services/movies/movie.service'

import { IMovie } from '@/shared/types/movie.types'

import { getRandoms } from '@/utils/helper/randomElements'

import Error404 from '../404'

export interface IMoviePage {
	movie: IMovie | undefined
	similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie similarMovies={similarMovies || []} movie={movie} />
	) : (
		<Error404 />
	)
}

// burada filmlerin sluglarını alıyoruz

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		const paths = movies.map(a => ({
			params: { slug: a.slug }
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: false
		}
	}
}

// filmin türrünü alıyoruz

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		// get movie by slug

		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		// get similar movies

		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map(genre => genre._id)
		)

		// bburada filmin türüne göre filmleri getiriyoruz
		// filter ile filmin id'sini alıyoruz ve o filmi getirmiyoruz

		const randomSimilarMovies = [...dataSimilarMovies]
		getRandoms(randomSimilarMovies)

		const similarMovies: IGalleryItem[] = randomSimilarMovies
			.slice(0, 5)
			.filter(m => m._id !== movie._id)
			.map(movie => ({
				name: movie.title,
				posterPath: movie.poster,
				link: getMovieUrl(movie.slug)
			}))

		return {
			props: {
				similarMovies,
				movie
			}
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}

export default MoviePage
