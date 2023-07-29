import { FC } from 'react'

import Link from 'next/link'

import Image from 'next/image'

import LogoImage from '@/assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link href='/'>
			<p className='px-layout mb-10 w-full'>
				<Image
					src={LogoImage}
					alt='Cinema logo'
					width={247}
					height={34}
					draggable={false}
				/>
			</p>
		</Link>
	)
}

export default Logo
