import '@/assets/styles/globals.scss'

import type { AppProps } from 'next/app'

import MainProvider from '@/providers/MainProvider'
import { TypeComponentAuthFields } from '@/shared/types/auth.interface'

type TypeAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}
