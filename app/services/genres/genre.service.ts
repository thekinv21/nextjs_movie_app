import { getGenresUrl, getGenresUrls } from '@/config/api.config'
import { IGenre } from '@/shared/types/movie.types'

import { axiosClassic, axiosInstance } from '@/api/interceptors'
import { IGenreEditInput } from '@/screens/admin/genre/genre-edit.interface'

export const GenreService = {
	// get gpopular genres

	//ilk önce api configi yaratmalısın config>apiConfig

	// döndğüreceği değerleri vermeyi unutma

	async getPopular(limit: number = 4) {
		return axiosClassic.get<IGenre[]>(getGenresUrl('popular'), {
			params: {
				limit: limit
			}
		})
	},

	// get all genres

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	//get genre by id

	async getById(_id: string) {
		return axiosInstance.get<IGenreEditInput>(getGenresUrl(`${_id}`))
	},

	// create genre

	async create() {
		return axiosInstance.post<string>(getGenresUrl(''))
	},
	//  edit genre

	async updateGenre(_id: string, data: IGenreEditInput) {
		return axiosInstance.put<string>(getGenresUrl(`/${_id}`), data)
	},

	// delete genre
	async deleteGenres(_id: string) {
		return axiosInstance.delete<string>(getGenresUrl(`${_id}`))
	}
}
