import { FC } from 'react'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const Error404: FC = () => {
	return (
		<Meta title='Page not Found'>
			<Heading title='404 - Page is Not Found' />
		</Meta>
	)
}

export default Error404
