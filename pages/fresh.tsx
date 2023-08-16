import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog/Catalog'
import { MovieService } from '@/services/movies/movie.service'
import { IMovie } from '@/shared/types/movie.types'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title='Fresh Movies'
			description='New movies and series so easy and fast to access'
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		return {
			props: { movies }
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}

export default FreshPage
