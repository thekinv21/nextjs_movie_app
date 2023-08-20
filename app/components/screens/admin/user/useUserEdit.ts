import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { getAdminUrl } from '@/config/url.config'

import { UserService } from '@/services/users/user.service'

import { IUserEditInput } from './user.interface'

export const useUserEdit = () => {
	// useForm hookunu kullanarak formu oluşturuyoruz

	const { register, formState, setValue, handleSubmit, control } =
		useForm<IUserEditInput>({
			mode: 'onChange'
		})

	// useRouter hookunu kullanarak router objesini alıyoruz

	const { push, query } = useRouter()

	// query.id ile gelen id değerini stringe çeviriyoruz
	const userId = String(query.id)

	const { isLoading } = useQuery(
		['edit user', userId],
		() => UserService.getById(userId),
		{
			onSuccess: ({ data }) => {
				// eğer başarılı ise setValue ile formdaki alanları dolduruyoruz
				setValue('email', data.email)
				setValue('isAdmin', data.isAdmin)
			},

			// eğer hata olursa toast ile hata mesajı gösteriyoruz

			onError: () => {
				toast.error('User not found')
			},

			// eğer query.id varsa yani edit sayfasındaysak bu hooku çalıştırıyoruz
			enabled: !!query.id
		}
	)

	// useMutation hookunu kullanarak updateUser fonksiyonunu oluşturuyoruz

	const { mutateAsync } = useMutation(
		['update  user', userId],
		(data: IUserEditInput) => UserService.updateUser(userId, data),
		{
			onSuccess: () => {
				toast.success('User updated successfully')
				push(getAdminUrl('users'))
			},
			onError: () => {
				toast.error('User update failed')
			}
		}
	)

	// onSubmitEdit fonksiyonunu oluşturuyoruz

	const onSubmitEdit = async (data: IUserEditInput) => {
		await mutateAsync(data)
	}

	// hooku döndürüyoruz
	return useMemo(
		() => ({
			isLoading,
			register,
			formState,
			handleSubmit,
			onSubmitEdit,
			control
		}),
		[register, formState, handleSubmit, onSubmitEdit, control]
	)
}
