import { IAuthResponse, ITokens } from '@/store/user/user.interface'

import Cookies from 'js-cookie'

/* save token to Storage */
/* cookie için özel kütüphane kullanıldı : js-cookie */

export const saveTokensToStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

/* save user to localeStorage */

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensToStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

/* remove token from Storage */

export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
