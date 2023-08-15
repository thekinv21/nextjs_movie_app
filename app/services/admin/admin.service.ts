import { axiosInstance } from '@/api/interceptors'
import { getUsersUrl } from '@/config/api.config'
import { getAdminUsersUrl } from '@/config/url.config'

export const AdminService = {
	// get users count

	async getCountUsers() {
		return axiosInstance.get<number>(getUsersUrl('count'))
	},

	async getAllUsers() {
		return axiosInstance.get(getAdminUsersUrl('users'))
	}
}
