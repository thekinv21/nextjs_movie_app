import { getStoreLocal } from '@/utils/localStorage/LocalStorage'

import { createSlice } from '@reduxjs/toolkit'

import { checkAuth, login, logout, register } from './user.actions'

import { IInitialState } from './user.interface'

// create user initial state

// isloading başta false olacak
// user ise null

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocal('user')
}

export const userSlice = createSlice({
	name: 'user',
	initialState,

	// normal recudecerlar async işlemi yapamaz

	reducers: {},

	// extraReducer async işlem yapabilir

	// 1.kural parametre olarak builder almalıyız

	extraReducers: builder => {
		//! register için

		// istek gönderiliyor
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})

			// istek requesti bitti ise
			.addCase(register.fulfilled, (state, { payload }) => {
				;(state.isLoading = false), (state.user = payload.user)
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
			})

			//! login için

			// istek gönderiliyor  ise
			.addCase(login.pending, state => {
				state.isLoading = true
			})

			// istek requesti bitti ise
			.addCase(login.fulfilled, (state, { payload }) => {
				;(state.isLoading = false), (state.user = payload.user)
			})

			// istek hatalı ise
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})

			//! logout için
			.addCase(logout.fulfilled, state => {
				;(state.isLoading = false), (state.user = null)
			})

			//!check auth için

			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})

export const { reducer } = userSlice
