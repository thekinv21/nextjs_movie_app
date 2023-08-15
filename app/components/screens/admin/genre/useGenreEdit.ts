import { errorCatch } from '@/api/api.helpers'
import { getAdminUrl } from '@/config/url.config'
import { GenreService } from '@/services/genres/genre.service'
import { getKeys } from '@/utils/object/getKeys'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IGenreEditInput } from './genre-edit.interface'

// buarada setValue vermemizin sebebi , editlemek istediğimiz genrenin değerleri inputlarımızda yazılı olması için kullacağız

// yani güncellemek istediğimiz genrein değerleri ınputun default value'su olacacak

// not : Generik vermek zorunludur

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()

	// burada string yazmamızın sebebi şu ki, değer undefined olabilir
	// string ile kapladık, id undefinded  olsa da boş satır döndürür
	const genreId = String(query.id)

	// neden array olarak verdik?
	// array olarak vermemizin sebebi şu ki
	//parametre olarak verebilmek için array içinde ilk önce key sonra parametre verdik
	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
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
		'update genre',
		(data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
		{
			onError: error => {
				toast.error(errorCatch(error))
			},
			onSuccess: () => {
				toast.success('Genre Updated...')
				push(getAdminUrl('genres'))
			}
		}
	)

	// when click update  bbutton
	const onSubmitHandler: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmitHandler, isLoading }
}
