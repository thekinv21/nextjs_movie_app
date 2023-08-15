import { IActors } from '@/shared/types/movie.types'

export interface IActorEditInput extends Omit<IActors, '_id'> {}
