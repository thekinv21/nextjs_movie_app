import { IActorEditInput } from '@/screens/admin/actor/actor-edit.interface'

import { getActorsUrl, getActorsUrls } from '@/config/api.config'

import { IActors } from '@/shared/types/movie.types'

import { axiosClassic, axiosInstance } from '@/api/interceptors'

export const ActorsService = {
	//* get all actors

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActors[]>(getActorsUrls(), {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	//* get by ıd

	async getById(_id: string) {
		return axiosInstance.get<IActorEditInput>(getActorsUrl(`${_id}`))
	},

	//* create actor
	async createActor() {
		return axiosInstance.post<string>(getActorsUrl(''))
	},

	//* update Actor

	async updateActor(_id: string, data: IActorEditInput) {
		return axiosInstance.put<string>(getActorsUrl(`/${_id}`), data)
	},
	//* delete actor

	async deleteActor(_id: string) {
		return axiosInstance.delete<string>(getActorsUrl(`/${_id}`))
	},

	//* get actors by  actor

	async getBySlug(slug: string) {
		return axiosClassic.get<IActors>(getActorsUrl(`/by-slug/${slug}`))
	}
}
