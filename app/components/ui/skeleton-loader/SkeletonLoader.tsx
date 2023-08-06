import { FC } from 'react'

import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import classNames from 'classnames'

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
	return (
		<Skeleton
			{...rest}
			baseColor='#1F2125'
			highlightColor='#292A2E'
			className={classNames('rounded-lg', className)}
		/>
	)
}

export default SkeletonLoader
