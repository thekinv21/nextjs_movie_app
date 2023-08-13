import { axiosInstance } from '@/api/interceptors'

export const UploadService = {
	// headerse multipart vermemizin sebebi şu  ki
	// servere biz bir ffile gönderiyoruz

	async upload(file: FormData, folder?: string) {
		return axiosInstance.post<{ url: string; name: string }[]>('files', file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}
