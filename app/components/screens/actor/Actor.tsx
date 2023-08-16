import Catalog from '@/components/ui/catalog/Catalog'
import { FC } from 'react'
import { IActorPage } from './actor.interface'

const Actor: FC<IActorPage> = ({ movies, actor }) => {
	return <Catalog movies={movies || []} title={actor.name} />
}

export default Actor
