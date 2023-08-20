import { IUser } from '@/shared/types/user.interface'

//  IuserEditInput interface'ini oluşturuyoruz
//  Omit<IUser, '_id' | 'createdAt'> ile IUser interface'inden _id ve createdAt alanlarını çıkarıyoruz
//  Çünkü bu alanları güncellemek istemiyoruz

export interface IUserEditInput extends Omit<IUser, '_id' | 'createdAt'> {}
