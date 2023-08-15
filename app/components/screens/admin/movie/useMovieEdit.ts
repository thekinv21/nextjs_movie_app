import { errorCatch } from '@/api/api.helpers'
import { getAdminUrl } from '@/config/url.config'
import { MovieService } from '@/services/movies/movie.service'
import { getKeys } from '@/utils/object/getKeys'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IMovieEditInput } from './movie-edit.interface'

// buarada setValue vermemizin sebebi , editlemek istediğimiz genrenin değerleri inputlarımızda yazılı olması için kullacağız

// yani güncellemek istediğimiz genrein değerleri ınputun default value'su olacacak

// not : Generik vermek zorunludur

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter()

	// burada string yazmamızın sebebi şu ki, değer undefined olabilir
	// string ile kapladık, id undefinded  olsa da boş satır döndürür
	const movieId = String(query.id)

	// neden array olarak verdik?
	// array olarak vermemizin sebebi şu ki
	//parametre olarak verebilmek için array içinde ilk önce key sonra parametre verdik
	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess: ({ data }) => {
				// buarada datanın içinden keylerini al ve arraye at
				getKeys(data).forEach(key => setValue(key, data[key]))
			},

			onError: error => {
				toast.error(errorCatch(error))
			},

			// sadece queryid var ise çalış komutu
			// query id yok ise çalışmaz
			enabled: !!query.id
		}
	)

	// update function

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.updateMovie(movieId, data),
		{
			onError: error => {
				toast.error(errorCatch(error))
			},
			onSuccess: () => {
				toast.success('Movie Updated...')
				push(getAdminUrl('movies'))
			}
		}
	)

	// when click update  bbutton
	const onSubmitHandler: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmitHandler, isLoading }
}
