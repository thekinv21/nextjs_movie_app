import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { getAdminUrl } from '@/config/url.config'
import { GenreService } from '@/services/genres/genre.service'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['genres list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
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
	const { mutateAsync: createAsync } = useMutation(
		'create genres',
		() => GenreService.create(),
		{
			onError(error) {
				toast.error('Error When Create Genres...')
			},
			onSuccess({ data: _id }) {
				toast.success('Genre Created..')
				push(getAdminUrl(`genre/edit/${_id}`))
			}
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
