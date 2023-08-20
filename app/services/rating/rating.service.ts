import { getRatingshUrl } from '@/config/api.config'

import { axiosInstance } from '@/api/interceptors'

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return axiosInstance.post<string>(getRatingshUrl(`set-rating`), {
			movieId,
			value
		})
	},

	async getByUserMovie(movieId: string) {
		return axiosInstance.get<number>(getRatingshUrl(`${movieId}`))
	}
}
