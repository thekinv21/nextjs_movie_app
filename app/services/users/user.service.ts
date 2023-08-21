import { IUserEditInput } from '@/components/screens/admin/user/user.interface'
import { IProfileInput } from '@/components/screens/profile/profile.interace'

import { getUsersUrl } from '@/config/api.config'
import { getAdminUsersUrl } from '@/config/url.config'

import { IMovie } from '@/shared/types/movie.types'
import { IUser } from '@/shared/types/user.interface'

import { axiosInstance } from '@/api/interceptors'

export const UserService = {
	// getUsers
	async getAll(searchTerm?: string) {
		return axiosInstance.get<IUser[]>(getAdminUsersUrl('users'), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},

	// get user by id
	async getById(_id: string) {
		return axiosInstance.get<IUser>(getUsersUrl(`/${_id}`))
	},

	// create user
	async createUser() {
		return axiosInstance.post<string>(getUsersUrl(``))
	},
	// create user
	async updateUser(_id: string, data: IUserEditInput) {
		return axiosInstance.put<string>(getUsersUrl(`/${_id}`), data)
	},

	async deleteUser(_id: string) {
		return axiosInstance.delete<string>(getUsersUrl(`/${_id}`))
	},

	// get user
	async getProfile() {
		return axiosInstance.get<IUser>(getUsersUrl(`profile`))
	},

	// update userProfile
	async updateProfile(data: IProfileInput) {
		return axiosInstance.put<string>(getUsersUrl(`profile`), data)
	},

	// get facorites

	async getFavorites() {
		return axiosInstance.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	// toggle favorite
	async toggleFavorite(movieId: string) {
		return axiosInstance.post<string>(getUsersUrl(`/profile/favorites`), {
			movieId
		})
	}
}
