import { useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movies/movie.service'
import { useQuery } from 'react-query'

export const useSearch = () => {
	// serach movie input values

	const [searchTerm, setSearchTerm] = useState('')

	// arama yapmak için custom hook
	// arama yapmak için verilen saniye
	// 5 saniye bakler

	const debouncedSearch = useDebounce(searchTerm, 500)

	// burada get req parametre olarak vermek için şu şekil yazılmalı

	// ['search movies' , debouncedSearch] ilk önce key , parametre

	const { isSuccess, data } = useQuery(
		['search movies', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			// burada {data} yazmamızın sebebi şu response data.data olarak dönüyor

			select: ({ data }) => data,

			// debounced yok ise istek atmaması için
			enabled: !!debouncedSearch
		}
	)

	const handleSearch = (e: any) => {
		setSearchTerm(e.target.value)
	}

	return { isSuccess, handleSearch, data, searchTerm }
}
