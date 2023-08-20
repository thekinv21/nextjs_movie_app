import { IUser } from '@/shared/types/user.interface'

export interface IProfileInput extends Pick<IUser, 'email' | 'password'> {}
