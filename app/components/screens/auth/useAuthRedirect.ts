import { useAuth } from '@/hooks/useAuth'

import { useRouter } from 'next/router'

import { useEffect } from 'react'

export const useAuthRedirect = () => {
	// user olup olmadığı bilgisi
	const { user } = useAuth()

	// user var ise
	const { query, push } = useRouter()

	// eğer herhangi istek iççinde redirect geçerse main'e atar
	const redirect = query.redirect ? String(query.redirect) : '/'

	useEffect(() => {
		// eğer user varsa istediği yere gitsin
		// yok ise zaten bişey olmaz..
		if (user) push(redirect)
	}, [user, redirect, push])
}
