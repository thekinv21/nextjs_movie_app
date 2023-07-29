import { TypeMaterialIconName } from '@/shared/types/icon.types'

export interface IMenuItem {
	icon: TypeMaterialIconName // iconlar backend de material ui iconlara göre ayarlı
	title: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
