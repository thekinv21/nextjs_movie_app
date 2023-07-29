import { API_URL } from '@/config/api.config'
import axios from 'axios'

// axios instance neden yazıldı?

// bu fonksyonu token ile baraber istek atmak için yazdık

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
