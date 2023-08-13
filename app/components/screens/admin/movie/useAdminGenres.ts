import { useQuery } from 'react-query'

import { GenreService } from '@/services/genres/genre.service'
import { IOption } from '@/ui/select/select.interface'

export const useAdminGenres = () => {
	const queryData = useQuery('list of genre', () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id
				})
			),
		onError(error) {}
	})

	return queryData
}
