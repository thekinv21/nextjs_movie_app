import { TypeMaterialIconName } from './icon.types'

export interface IGenre {
	_id: string
	name: string
	slug: string
	icon: TypeMaterialIconName
	description: string
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	parameters: IParameters
	genres: IGenre[]
	actors: IActors[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
}

export interface IParameters {
	year: number
	duration: number
	country: string
}

export interface IActors {
	_id: string
	name: string
	slug: string
	countMovies: number
	photo: string
}
