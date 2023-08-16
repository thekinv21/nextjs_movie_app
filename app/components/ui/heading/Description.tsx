import { FC } from 'react'

import parse from 'html-react-parser'

import cn from 'classnames'

interface IDescription {
	text: string
	className?: string
}

const Description: FC<IDescription> = ({ text, className }) => {
	return (
		<div
			className={cn('text-lg font-light text-white text-opacity-60', className)}
		>
			{parse(text)}
		</div>
	)
}

export default Description
