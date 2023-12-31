import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/users/user.service'

import { getAdminUrl } from '@/config/url.config'
import { convertMongoDate } from '@/utils/date/converMongoDate'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)]
					})
				),
			onError(error) {
				toast.error('User List Error')
			}
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string) => UserService.deleteUser(userId),
		{
			onError(error) {
				toast.error('Error When Delete User...')
			},
			onSuccess() {
				toast.success('User Deleted..')
				queryData.refetch()
			}
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		'create user',
		() => UserService.createUser(),
		{
			onError(error) {
				toast.error('Error When Create User...')
			},
			onSuccess({ data: _id }) {
				toast.success('User Created..')
				push(getAdminUrl(`user/edit/${_id}`))
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
