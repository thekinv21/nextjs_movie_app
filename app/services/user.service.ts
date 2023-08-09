import { axiosInstance } from '@/api/interceptors'

import { getUsersUrl } from '@/config/api.config'
import { getAdminUsersUrl } from '@/config/url.config'
import { IUser } from '@/shared/types/user.interface'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axiosInstance.get<IUser[]>(getAdminUsersUrl('users'), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},

	async deleteUser(_id: string) {
		return axiosInstance.delete<string>(getUsersUrl(`/${_id}`))
	}
}
