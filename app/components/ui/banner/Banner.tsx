import Image from 'next/image'
import { FC } from 'react'

import { IBanner } from './banner.interface'
import styles from './Banner.module.scss'

// image tag unoptimized nedir ve ne işe yarar?
// Sayfa yüklendiği zaman optimize edilmiş bir resim olmaz.
// Bu yüzden unoptimized kullanıyoruz.

// priority nedir ve ne işe yarar?
//	Next.js, sayfa yüklendiği zaman görüntülenen resimlerin optimize edilmesi için
//	öncelik sırası belirler. Öncelik sırası yüksek olan resimler önce optimize edilir.

// layout='fill' nedir ve ne işe yarar?
//	Resimlerin boyutlarını belirlemek için kullanılır.

const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				src={image}
				unoptimized
				layout='fill'
				className='image-like-bg object-top'
				priority
				alt=''
			/>

			{Detail && <Detail />}
		</div>
	)
}

export default Banner
