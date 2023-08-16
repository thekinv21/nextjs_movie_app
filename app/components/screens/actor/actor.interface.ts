import { IActors, IMovie } from '@/shared/types/movie.types'

export interface IActorPage {
	movies: IMovie[]
	actor: IActors
}
