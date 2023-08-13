import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { getAdminUrl } from '@/config/url.config'
import { ActorsService } from '@/services/actor/actor.service'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['actors list', debouncedSearch],
		() => ActorsService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, actor.slug, `${actor.countMovies}`]
					})
				),
			onError(error) {
				toast.error('Actor List Error')
			}
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actors',
		(id: string) => ActorsService.deleteActor(id),
		{
			onError(error) {
				toast.error('Error When Delete Actors...')
			},
			onSuccess() {
				toast.success('Actor Deleted..')
				queryData.refetch()
			}
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		'create actor',
		() => ActorsService.createActor(),
		{
			onError(error) {
				toast.error('Error When Create Actors...')
			},
			onSuccess({ data: _id }) {
				toast.success('Actor Created..')
				push(getAdminUrl(`actor/edit/${_id}`))
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
