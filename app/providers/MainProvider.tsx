import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '@/components/layout/Layout'

import { FC, PropsWithChildren } from 'react'

import { Provider } from 'react-redux'

import { TypeComponentAuthFields } from '@/shared/types/auth.interface'
import { store } from '@/store/store'
import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'
import ToastProvider from './ToastProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// bunu yazmamızı sebebi lu ki sekme değiştirdiğinde
			// tekrar istek atmaması için
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component
}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				{/*REACT QUERY PROVIDER */}

				<QueryClientProvider client={queryClient}>
					{/*REDUX TOASTR COMPONENT */}

					<ToastProvider />

					{/*CHILDRENS COMPONENT */}
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
