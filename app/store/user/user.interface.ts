// user interface
// user email

import { IUser } from '@/shared/types/user.interface'

// user isAdmin checked
export interface IUserState {
	email: string
	isAdmin: boolean
}

// tokens interface : refresh token yapmak sağlıklı
// eğer herhangi biri tokenı ele geçirir ise
// kolaylıkla tekrardan yeni token yazmamızı sağlar
export interface ITokens {
	accessToken: string
	refreshToken: string
}

// user initial state
// isloading istek atarken loading olma durumu ...

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

// auth inertfaceleri
// email ve password
export interface IEmailPassword {
	email: string
	password: string
}

// dönen requestler için interface

export interface IAuthResponse extends ITokens {
	user: IUser & {
		isAdmin: boolean
	}
}
