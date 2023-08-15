import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.interface'

import { useRouter } from 'next/router'

import { FC, PropsWithChildren } from 'react'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children
}) => {
	const { user } = useAuth()

	const router = useRouter()

	const Children = () => <>{children}</>

	// eğer user admin ise herşey yapabilir
	if (user?.isAdmin) return <Children />

	if (!isOnlyAdmin && !isOnlyUser) return <Children />

	// bu aşamaları geçtikten sonra da hala admin kaldı ise

	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	// sadece userı kontrol et
	const isUser = user && !user.isAdmin

	if (isUser && isOnlyUser) return <Children />
	else {
		router.pathname !== '/auth' && router.replace('/auth')

		return null
	}
}

export default CheckRole
