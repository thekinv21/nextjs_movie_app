import { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import SlideArrow from './SlideArrow/SlideArrow'
import SlideItem from './SlideItem'
import styles from './Slider.module.scss'
import { ISlide } from './slider.types'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonText?: string
}

const Slider: FC<ISlider> = ({ slides, buttonText }) => {
	const ref = useRef(null)

	const {
		handleClickArrow,
		isExistNext,
		isExistPrev,
		isSliding,
		currentIndex
	} = useSlider(slides.length)

	return (
		<div className={styles.slider}>
			{isExistPrev && (
				<SlideArrow
					variant='left'
					clickHandler={() => handleClickArrow('prev')}
				/>
			)}

			<CSSTransition
				nodeRef={ref}
				in={isSliding}
				timeout={300}
				classNames='slide-animation'
				unmountOnExit
			>
				<div ref={ref}>
					<SlideItem slide={slides[currentIndex]} />
				</div>
			</CSSTransition>

			{isExistNext && (
				<SlideArrow
					variant='right'
					clickHandler={() => handleClickArrow('next')}
				/>
			)}
		</div>
	)
}

export default Slider
