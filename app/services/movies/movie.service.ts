import { IMovieEditInput } from '@/screens/admin/movie/movie-edit.interface'

import { getMoviesUrl, getMoviesUrls } from '@/config/api.config'

import { IMovie } from '@/shared/types/movie.types'

import { axiosClassic, axiosInstance } from '@/api/interceptors'

export const MovieService = {
	//* all movies service

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},
	//* get Popular movies
	async getPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('most-popular')
		)

		return movies
	},

	//* create Movies

	async createMovie() {
		return axiosInstance.post<string>(getMoviesUrl(''))
	},

	//* update movie

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axiosInstance.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	//* delete movies

	async deleteMovies(_id: string) {
		return axiosInstance.delete<string>(getMoviesUrl(`/${_id}`))
	},

	//* get ById movie

	async getById(_id: string) {
		return axiosInstance.get<IMovie>(getMoviesUrl(`/${_id}`))
	},

	// get movies by  genre
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds
		})
	},

	// getby actor

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-actor/${actorId}`))
	},

	// get by slug
	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	//* update count opened
	async updateCountOpened(slug: string) {
		return axiosClassic.post(getMoviesUrl('/update-count-opened'), {
			slug
		})
	}
}
