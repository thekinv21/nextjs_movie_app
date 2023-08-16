import { IGenre, IMovie } from '@/shared/types/movie.types'

export interface IGenrePage {
	genre: IGenre
	movies: IMovie[]
}
