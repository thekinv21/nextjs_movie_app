import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

export interface IFavoriteItem extends Omit<IGalleryItem, 'content'> {
	title: string
	_id: string
}
