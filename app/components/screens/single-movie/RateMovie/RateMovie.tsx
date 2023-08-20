import { FC } from 'react'
import StarRatingComponent from 'react-star-rating-component'

import AuthButton from '@/components/ui/video-player/AuthPlaceholder/AuthButton'

import styles from './RateMovie.module.scss'
import { useRateMovie } from './useRateMovie'

export interface IRateMovie {
	id: string
	slug: string
}

const RateMovie: FC<IRateMovie> = ({ slug, id }) => {
	const { handleRate, rating, isSended, user } = useRateMovie(id)

	return (
		<div className={styles.wrapper}>
			<h3>How do you llike the movie?</h3>
			<p>Rating improve recommendations</p>

			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for Rating!</div>
					) : (
						<StarRatingComponent
							name='star-rating'
							value={rating}
							onStarClick={handleRate}
							emptyStarColor='#4f4f4f'
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
