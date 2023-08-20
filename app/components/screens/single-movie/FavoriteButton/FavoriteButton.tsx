import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { UserService } from '@/services/users/user.service'

import { useFavorites } from '../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'
import HeartImage from './heart-animation.png'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	// isSmashed is the opposite of isFavorite
	const [isSmashed, setIsSmashed] = useState<boolean>(false)

	const { favoriteMovies, refetch } = useFavorites()

	useEffect(() => {
		// burada favoriteMovies undefined olabilir
		if (favoriteMovies) {
			// eğer favoriteMovies içinde movieId varsa isFavorite true olur

			const isFavorite = favoriteMovies.some(fav => fav._id === movieId)

			// eğer isSmashed değeri ile isFavorite değeri aynı değilse
			// isSmashed değerini isFavorite değerine eşitliyoruz

			if (isSmashed !== isFavorite) setIsSmashed(isFavorite)
		}
	}, [favoriteMovies, isSmashed, movieId])

	// mutateAsync fonksiyonu ile toggleFavorite fonksiyonunu çalıştırıyoruz

	const { mutateAsync } = useMutation(
		'update favorite',
		() => UserService.toggleFavorite(movieId),
		{
			onSuccess: () => {
				toast.success('Successfully updated')
				refetch()
				setIsSmashed(!isSmashed)
			},
			onError: () => {
				toast.error('Something went wrong')
			}
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed
			})}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	)
}

export default FavoriteButton
