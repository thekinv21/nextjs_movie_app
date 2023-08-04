import { useActions } from '@/hooks/useActions'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.interface'

import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import dynamic from 'next/dynamic'
import { FC, PropsWithChildren, useEffect } from 'react'

// bu component sadece ve sadece client tarafında yüklenecektir

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children
}) => {
	const { user } = useAuth()

	const { logout, checkAuth } = useActions()

	const { pathname } = useRouter()

	// eğer token var ise onu inceletmeye backende gönder
	useEffect(() => {
		const accessToken = Cookies.get('accessToken')

		if (accessToken) {
			checkAuth()
		}
	}, [])

	// eğer token yok olup da user sistemde ise logout yap

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')

		if (!refreshToken && user) {
			logout()
		}
	}, [pathname])

	return !isOnlyAdmin && !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
