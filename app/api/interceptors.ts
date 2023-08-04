import { API_URL } from '@/config/api.config'

import axios from 'axios'

import { errorCatch, getContentType } from './api.helpers'

import { removeTokensStorage } from '@/services/auth/auth.helper'

import { AuthService } from '@/services/auth/auth.service'

import Cookies from 'js-cookie'

//? axios instance neden yazıldı?
//* bu fonksyonu token ile baraber istek atmak için yazdık
//? interceptor nedir ve nasıl kullanılır ?
// *auth  ve başka işlemler için biz token kullanıyoruz  ve tokenın süresi  bitince bize hata mesajı dönüyor
//? interceptor bu hatayı alır ve bakar , eğer hata auth ve token ile ilgili ise
//* servera baştan istek atar ve refresh token yardımıyla başka yeni token alır
//? user bunu farketmez bile

// classic  axios request

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

//? axios instance with token

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

// token ile requestler için
axiosInstance.interceptors.request.use(config => {
	// tokenı al
	const accessToken = Cookies.get('accessToken')

	// header ile token var ise
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	// configi dönndür

	return config
})

//? response da sadece configi değil , erroru da almalıyız

axiosInstance.interceptors.response.use(
	config => config,
	async error => {
		// orjinal requestden dönen config

		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			!error.config._isRetry // _isRetry el ile yazdığımızı function || baştan istek atması için yazdık
		) {
			//* requesti önceden attığımızı belirttik
			originalRequest._isRetry = true

			try {
				// refresh token ile yeni token al
				await AuthService.getNewTokens()
				// baştan istek at
				return axiosInstance.request(originalRequest)
			} catch (error) {
				// eğer hata almaya deveam ederse tokenları sil
				if (errorCatch(error) === 'jwt expired') removeTokensStorage()
			}
		}

		throw error //önemli unutma
	}
)
