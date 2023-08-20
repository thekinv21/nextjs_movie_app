import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating/rating.service'

export const useRateMovie = (movieId: string) => {
	// user olup olmadığını kontrol etmek için
	const { user } = useAuth()

	// rating
	const [rating, setRating] = useState<number>(0)

	// sended rating
	const [isSended, setIsSended] = useState<boolean>(false)

	// get rating
	const { refetch } = useQuery(
		['rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data)
			},
			onError: () => {
				toast.error('Error while fetching rating')
			},

			// sadece movie id varsa çalışacak
			enabled: !!movieId
		}
	)

	// update rating

	const { mutateAsync } = useMutation(
		'set movie rating',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onSuccess: () => {
				toast.success('Rating updated')
				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 3400)
			}
		}
	)

	const handleRate = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return {
		isSended,
		rating,
		handleRate,
		user
	}
}
