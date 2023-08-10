import { axiosInstance } from '@/api/interceptors'
import { getActorsUrl, getActorsUrls } from '@/config/api.config'
import { IActors } from '@/shared/types/movie.types'

export const ActorsService = {
	async getAll(searchTerm?: string) {
		return axiosInstance.get<IActors[]>(getActorsUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async deleteActor(_id: string) {
		return axiosInstance.delete<string>(getActorsUrl(`/${_id}`))
	}
}
