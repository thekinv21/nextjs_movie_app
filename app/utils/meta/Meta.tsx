import { FC, PropsWithChildren } from 'react'

import { siteName, titleMerge } from '@/config/seo.config'

import Head from 'next/head'

import { useRouter } from 'next/router'

import { ISeo } from './meta.interface'

import { onlyText } from '../helper/clearText'

import logoImage from '@/assets/images/logo.svg'

const Meta: FC<PropsWithChildren<ISeo>> = ({
	title,
	description,
	image,
	children
}) => {
	const { asPath } = useRouter()

	// hangi sayfada olduğumuz link bilgisi

	const currentUrl = `${process.env.APP_URL} ${asPath}`

	return (
		<>
			{/* HEAD YARDIMIYILA HER SAYFANIN TITLE VE DESCRIP ERIŞEBİLİRİZ */}
			<Head>
				{/* WEBSITE TITLE */}
				<title itemProp='headline'>{titleMerge(title)}</title>

				{description ? (
					<>
						{/* WEBSITE DESCRİPTION */}
						<meta
							itemProp='description'
							name='description'
							content={onlyText(`${description}`, 152)}
						/>
						{/* CURRENT PAGE URL */}
						<link rel='canonical' href={currentUrl} />
						{/* PAGE LANGUAGE */}
						<meta property='og:locale' content='en' />
						{/* WEBSITE TITLE FOR SOSSIAL */}
						<meta property='og:title' content={titleMerge(title)} />
						{/*PAGE URL FOR SOSIAL */}
						<meta property='og:url' content={currentUrl} />
						{/* CURRENT PAGE FAVICON FOR SOSIAL */}
						<meta property='og:image' content={image || logoImage} />
						{/* CURRENT PAGE NAME FOR SOSSIAL */}
						<meta property='og:site_name' content={siteName} />
						{/* CURRENT PAGE URL */}
						<meta
							property='og:description'
							content={onlyText(`${description}`, 197)}
						/>
					</>
				) : (
					<meta name='robots' content='noindex, nofollow' />
				)}
			</Head>

			{children}
		</>
	)
}

export default Meta
