// user actions

import { errorCatch } from '@/api/api.helpers'
import { AuthService } from '@/services/auth/auth.service'
import { toastError } from '@/utils/errors/toast-error'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IAuthResponse, IEmailPassword } from './user.interface'

/*register*/

// createAsyncThunk yapark ilk olarak isim vermelisin asyncden önce
// createAsyncThunk iki tane promiss döndüdürüyor
// 1. Server Response , 2. ise Request body

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.register(email, password)

			toast.success('Registration Completed...')

			return response
		} catch (error) {
			toastError(error)

			return thunkAPI.rejectWithValue(error)
		}
	}
)

/* login */

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.login(email, password)

			// saveToStorage(response.data)
			// saveTokensToStorage(response.data)

			return response
		} catch (error) {
			toastError(error)

			return thunkAPI.rejectWithValue(error)
		}
	}
)

/* logout */

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
})

/*checkAuth */

export const checkAuth = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()

			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastError(error)

				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)
