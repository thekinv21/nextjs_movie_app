import Catalog from '@/components/ui/catalog/Catalog'
import { MovieService } from '@/services/movies/movie.service'
import { IMovie } from '@/shared/types/movie.types'
import { GetStaticProps, NextPage } from 'next'

const trendingPage: NextPage<{ trending: IMovie[] }> = ({ trending }) => {
	return (
		<Catalog
			movies={trending || []}
			title='Trending Now'
			description='You can easy find Trending movies and watch it online for free '
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const trending = await MovieService.getPopularMovies()

		return {
			props: { trending }
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}

export default trendingPage
