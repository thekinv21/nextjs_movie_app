// backend'ten populer filmlerin kategori linklerini almak için

import { GenreService } from '@/services/genre.service'

import { getGenreUrl } from '@/config/url.config'
import { useQuery } from 'react-query'
import { IMenuItem } from '../menu_helpers/menu.interface'

export const usePopularGenres = () => {
	// burada  key unique olmalı react-query kuralı
	// aksi taktırde aynı keye sahiplere baraber istek atar

	const queryData = useQuery(
		'popular genres menu',
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data
					.map(
						genre =>
							({
								icon: genre.icon,
								link: getGenreUrl(genre.slug),
								title: genre.name
							}) as IMenuItem
					)
					.splice(0, 4), // burada kesme işlemi yaptık sadece 4 item alır diziden

			onError(err) {
				// errorr ekle
			}
		}
	)

	return queryData
}
