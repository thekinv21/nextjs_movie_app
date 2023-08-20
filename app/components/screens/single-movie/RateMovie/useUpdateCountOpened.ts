import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { MovieService } from '@/services/movies/movie.service'

export const useUpdateCountOpened = (slug: string) => {
	// update count opened function
	const { mutateAsync } = useMutation('updateCountOpened', () =>
		MovieService.updateCountOpened(slug)
	)

	// sadece mount olduğunda çalışacak
	useEffect(() => {
		mutateAsync()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
