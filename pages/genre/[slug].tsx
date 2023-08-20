import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { IGenrePage } from '@/components/screens/genre/genre.interace'

import Genre from '@/screens/genre/Genre'

import { GenreService } from '@/services/genres/genre.service'
import { MovieService } from '@/services/movies/movie.service'

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
	return genre ? <Genre genre={genre} movies={movies} /> : <div>Not found</div>
}

// getStaticPaths ne işe yarar?

// getStaticPaths fonksiyonu, sayfamızın statik olarak oluşturulacağı slug değerlerini belirliyor.

// Bu sayede sayfamızın statik olarak oluşturulacağı slug değerlerini belirliyoruz.

// getStaticPaths fonksiyonu, sayfamızın build edilmesi sırasında çalıştırılıyor.

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()

		const paths = genres.map(genre => ({
			// params.slug ile sayfaya gelen slug değerini alıyoruz.
			// eğer genreye id ile erişiyorsan, id ise params : { id : genre.id } şeklinde yazıyoruz.
			params: {
				slug: genre.slug
			}
		}))

		// fallback : "blocking" ise yeni bir sayfa isteği geldiğinde sayfamızın statik olarak oluşturulmasını sağlıyoruz.

		// fallback : false ise olmayan slug değerleri için 404 sayfası döndürüyoruz.
		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			// fallback: false ile sayfamızın statik olarak oluşturulacağı slug değerlerini belirliyoruz. Yani olmayacak slug değerleri için 404 sayfası döndürüyoruz.
			fallback: false,

			// yollar zorunludur çünkü next.js sayfaları oluştururken sayfa yollarını oluşturur
			paths: []
		}
	}
}

// getStaticProps ne işe yarar?

// getStaticProps fonksiyonu sayesinde sayfamızın statik olarak oluşturulmasını sağlıyoruz.

// Bu sayede sayfamızın her isteğinde veritabanına bağlanmak yerine, statik olarak oluşturduğumuz sayfayı döndürüyoruz.

// getStaticProps fonksiyonu, sayfamızın build edilmesi sırasında çalıştırılıyor.

export const getStaticProps: GetStaticProps = async ({ params }) => {
	// params.slug ile sayfaya gelen slug değerini alıyoruz.
	try {
		const { data: genre } = await GenreService.getBySlug(String(params?.slug))

		// genre._id ile genre id'sine göre filmleri getiriyoruz.

		const { data: movies } = await MovieService.getByGenres([genre._id])

		// getMoviesStaticProps fonksiyonu içerisinde return edilen obje, sayfamızın props'larına aktarılıyor.
		return {
			props: {
				movies,
				genre
			}
		}
	} catch (error) {
		return {
			// notFound: true
			props: {}
		}
	}
}

export default GenrePage
