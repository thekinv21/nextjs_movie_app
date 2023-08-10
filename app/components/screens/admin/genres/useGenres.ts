import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { getGenresUrl } from '@/config/api.config'
import { GenreService } from '@/services/genres/genre.service'
import { toast } from 'react-toastify'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['genres list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getGenresUrl(`/edit/${genre._id}`),
						items: [genre.name, genre.slug]
					})
				),
			onError(error) {
				toast.error('Genres List Error')
			}
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movies',
		(id: string) => GenreService.deleteGenres(id),
		{
			onError(error) {
				toast.error('Error When Delete Genres...')
			},
			onSuccess() {
				toast.success('Genre Deleted..')
				queryData.refetch()
			}
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
