import { FC } from 'react'

import Catalog from '@/components/ui/catalog/Catalog'

import { IGenrePage } from './genre.interace'

const Genre: FC<IGenrePage> = ({ movies, genre }) => {
	return (
		<Catalog
			title={genre.name}
			description={genre.description}
			movies={movies || []}
		/>
	)
}

export default Genre
