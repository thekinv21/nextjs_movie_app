import { UploadService } from '@/services/upload/upload.service'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => UploadService.upload(data, folder),
		{
			onSuccess({ data }) {
				onChange(data[0].url)
			},
			onError(error) {
				toast.error('Error when uploade..')
			}
		}
	)

	const uploadImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('image', files[0])
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			}
		},
		[mutateAsync]
	)

	return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading])
}
