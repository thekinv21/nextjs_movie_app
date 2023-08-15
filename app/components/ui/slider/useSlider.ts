import { useState } from 'react'

export const useSlider = (length: number) => {
	// sliderın hangi elemanında olduğunu belirler
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	// kaydırma işleminin gerçekleşip gerçekleşmediğini belirler

	const [isSliding, setIsSliding] = useState<boolean>(true)

	// ileri ve geri butonlarının görünüp görünmeyeceğini belirler
	const isExistNext = currentIndex + 1 < length
	const isExistPrev = currentIndex ? currentIndex - 1 < length : false

	// hangi yöne kaydırılacağını belirler

	const handleClickArrow = (direction: 'next' | 'prev') => {
		// eğer next ise ve son elemana gelmişse 0. elemana döndürür
		const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

		// eğer prev ise ve 0. elemana gelmişse son elemana döndürür
		setIsSliding(false)

		setTimeout(() => {
			setCurrentIndex(newIndex)
			setIsSliding(true)
		}, 300)
	}

	return {
		currentIndex,
		isSliding,
		isExistNext,
		isExistPrev,
		handleClickArrow
	}
}
