import { getGenresUrl, getGenresUrls } from '@/config/api.config'
import { IGenre } from '@/shared/types/movie.types'

import { axiosClassic, axiosInstance } from '@/api/interceptors'

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

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async deleteGenres(_id: string) {
		return axiosInstance.delete<string>(getGenresUrl(`${_id}`))
	}
}
