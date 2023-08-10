import { axiosClassic, axiosInstance } from '@/api/interceptors'
import { getMoviesUrl, getMoviesUrls } from '@/config/api.config'
import { IMovie } from '@/shared/types/movie.types'

export const MovieService = {
	// all movies service

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async getPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('most-popular')
		)

		return movies
	},

	async deleteMovies(_id: string) {
		return axiosInstance.delete<string>(getMoviesUrl(`/${_id}`))
	}
}
