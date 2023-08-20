import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { UserService } from '@/services/users/user.service'

import { IProfileInput } from './profile.interace'

export const useProfile = () => {
	// useForm hookunu kullanarak formu oluşturuyoruz

	const { register, formState, handleSubmit, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange'
		})

	// useQuery hookunu kullanarak profile bilgilerini alıyoruz

	const { isLoading } = useQuery(['profile'], () => UserService.getProfile(), {
		onSuccess({ data }) {
			setValue('email', data.email)
		},
		onError() {
			toast.error('Error fetching user profile')
		}
	})

	// useMutation hookunu kullanarak updateUser fonksiyonunu oluşturuyoruz

	const { mutateAsync } = useMutation(
		['update'],
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onSuccess() {
				toast.success('Profile updated successfully')
			},

			onError() {
				toast.error('Error updating profile')
			}
		}
	)

	// onSubmitUpdate fonksiyonunu oluşturuyoruz

	const onSubmitUpdate: SubmitHandler<IProfileInput> = async data => {
		await mutateAsync(data)
	}

	// hooku döndürüyoruz
	return useMemo(
		() => ({
			isLoading,
			mutateAsync,
			register,
			formState,
			handleSubmit,
			onSubmitUpdate
		}),
		[mutateAsync, register, formState, handleSubmit, onSubmitUpdate]
	)
}
