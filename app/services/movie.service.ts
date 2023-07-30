import { axiosInstance } from '@/api/interceptors'
import { getMoviesUrl } from '@/config/api.config'
import { IMovie } from '@/shared/types/movie.types'

export const MovieService = {
	// all movies service

	async getAll(searchTerm?: string) {
		return axiosInstance.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async getPopularMovies() {
		const { data: movies } = await axiosInstance.get<IMovie[]>(
			getMoviesUrl('most-popular')
		)

		return movies
	}
}
