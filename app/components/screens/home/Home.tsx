import { FC } from 'react'
import { IHome } from './home.interface'

import Heading from '@/components/ui/heading/Heading'
import SubHeading from '@/components/ui/heading/SubHeading'
import Slider from '@/components/ui/slider/Slider'
import Meta from '@/utils/meta/Meta'
import dynamic from 'next/dynamic'

const DynamicGallery = dynamic(
	() => import('@/components/ui/gallery/Gallery'),
	{
		ssr: false
	}
)

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Meta title='Home' description='Watch movies be like'>
			<Heading
				title='Watch Movies for VKcinema'
				className='text-gray-300 mb-8 text-xl'
			/>

			{slides.length && <Slider slides={slides} />}

			<div className='mt-10'>
				<SubHeading title='Trending Movies' />

				{/** GALLERRY */}

				<DynamicGallery items={trendingMovies} />
			</div>

			<div>
				<SubHeading title='Actors' />

				{/** Actors */}

				<DynamicGallery items={actors} />
			</div>
		</Meta>
	)
}

export default Home
