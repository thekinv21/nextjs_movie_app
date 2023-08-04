import { getGenresUrl } from '@/config/api.config'
import { IGenre } from '@/shared/types/movie.types'

import { axiosClassic } from '@/api/interceptors'

export const GenreService = {
	// get gpopular genres

	//ilk önce api configi yaratmalısın config>apiConfig

	// döndğüreceği değerleri vermeyi unutma

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl('popular'), {
			params: searchTerm ? { searchTerm } : {}
		})
	}
}
