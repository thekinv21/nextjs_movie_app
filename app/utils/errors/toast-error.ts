import { errorCatch } from '@/api/api.helpers'
import { toast } from 'react-toastify'

export const toastError = (error: any, title?: string) => {
	const message = errorCatch(error)
	toast.error(title || message)

	throw message
}
