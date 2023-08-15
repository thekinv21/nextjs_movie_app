import { axiosInstance } from '@/api/interceptors'
import { getActorsUrl, getActorsUrls } from '@/config/api.config'
import { IActorEditInput } from '@/screens/admin/actor/actor-edit.interface'
import { IActors } from '@/shared/types/movie.types'

export const ActorsService = {
	// get all actors

	async getAll(searchTerm?: string) {
		return axiosInstance.get<IActors[]>(getActorsUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	// get by ıd

	async getById(_id: string) {
		return axiosInstance.get<IActorEditInput>(getActorsUrl(`${_id}`))
	},

	// create actor
	async createActor() {
		return axiosInstance.post<string>(getActorsUrl(''))
	},

	// update Actor

	async updateActor(_id: string, data: IActorEditInput) {
		return axiosInstance.put<string>(getActorsUrl(`/${_id}`), data)
	},
	// delete actor

	async deleteActor(_id: string) {
		return axiosInstance.delete<string>(getActorsUrl(`/${_id}`))
	}
}
