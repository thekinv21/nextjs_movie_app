import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '@/components/layout/Layout'
import { FC, PropsWithChildren } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// bunu yazmamızı sebebi lu ki sekme değiştirdiğinde
			// tekrar istek atmaması için
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>{children}</Layout>
		</QueryClientProvider>
	)
}

export default MainProvider
