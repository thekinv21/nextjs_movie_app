import { FC } from 'react'

import Heading from '@/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'

const Error500: FC = () => {
	return (
		<Meta title='Page is Not Found'>
			<Heading title='500 - Server-Side Error' />
		</Meta>
	)
}

export default Error500
