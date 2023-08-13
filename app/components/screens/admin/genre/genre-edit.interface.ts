import { IGenre } from '@/shared/types/movie.types'

//* Omit : var olan interace'in içinden kullanılmayacakları çıkartmak için kullanılır : aşagidaki editleme örneğinde _id editlenmeyeceği  için onu çıkarttık

export interface IGenreEditInput extends Omit<IGenre, '_id'> {}
