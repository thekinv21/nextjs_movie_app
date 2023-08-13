import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { getAdminUrl } from '@/config/url.config'
import { MovieService } from '@/services/movies/movie.service'
import { getGenresList } from '@/utils/movie/getGenresList'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating)
						]
					})
				),
			onError(error) {
				toast.error('Movies List Error')
			}
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movies',
		(movieId: string) => MovieService.deleteMovies(movieId),
		{
			onError(error) {
				toast.error('Error When Delete Movie...')
			},
			onSuccess() {
				toast.success('Movie Deleted..')
				queryData.refetch()
			}
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'create genres',
		() => MovieService.createMovie(),
		{
			onError(error) {
				toast.error('Error When Create Movie...')
			},
			onSuccess({ data: _id }) {
				toast.success('Movie Created..')
				push(getAdminUrl(`movie/edit/${_id}`))
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
