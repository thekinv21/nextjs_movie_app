import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { UserService } from '@/services/users/user.service'

export const useFavorites = () => {
	const {
		data: favoriteMovies,
		isLoading,
		refetch
	} = useQuery('favorites', () => UserService.getFavorites(), {
		select: ({ data }) => data
	})

	return useMemo(
		() => ({ isLoading, favoriteMovies, refetch }),
		[favoriteMovies, isLoading, refetch]
	)
}
