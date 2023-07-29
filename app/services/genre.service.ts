import { getGenresUrl } from '@/config/api.config'
import { IGenre } from '@/shared/types/movie.types'

import { axiosInstance } from '@/api/interceptors'

export const GenreService = {
	// get gpopular genres

	//ilk önce api configi yaratmalısın config>apiConfig

	// döndğüreceği değerleri vermeyi unutma

	async getAll(searchTerm?: string) {
		return axiosInstance.get<IGenre[]>(getGenresUrl('popular'), {
			params: searchTerm ? { searchTerm } : {}
		})
	}
}
