import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './rootReducer'

export const store = configureStore({
	// toast reducerı bağladık
	reducer: reducers,

	// devtools : helper
	devTools: true
})

// database'dekilerin tipini belirleyelim/
// çalışmak daha kolay olur

export type TypeRootState = ReturnType<typeof store.getState>
