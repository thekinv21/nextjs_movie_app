import type { GetStaticProps, NextPage } from 'next'

import Home from '@/screens/home/Home'

import { ISlide } from '@/components/ui/slider/slider.types'

import { getGenresList } from '@/utils/movie/getGenresList'

import { getActorUrl, getMovieUrl } from '@/config/url.config'

import { MovieService } from '@/services/movies/movie.service'

import { errorCatch } from '@/api/api.helpers'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ActorsService } from '@/services/actor/actor.service'

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		const trending = await MovieService.getPopularMovies()

		const { data: dataActors } = await ActorsService.getAll()

		const slides: ISlide[] = movies.slice(0, 8).map(m => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster
		}))

		const actors: IGalleryItem[] = dataActors.slice(0, 8).map(a => ({
			_id: a._id,
			name: a.name,
			posterPath: a.photo,
			link: getActorUrl(a.slug),
			content: {
				title: a.name,
				subTitle: `${a.countMovies} movies`
			}
		}))

		const trendingMovies: IGalleryItem[] = trending.map(m => ({
			name: m.title,
			posterPath: m.poster,
			link: getMovieUrl(m.slug)
		}))

		return {
			props: {
				slides,
				trendingMovies,
				actors
			} as IHome
		}
	} catch (error) {
		console.log(errorCatch(error))

		return {
			props: {
				slides: [],
				trendingMovies: [],
				actors: []
			} as IHome
		}
	}
}

export default HomePage
