import cn from 'classnames'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import MaterialIcon from '../icons/MaterialIcon'

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.types'
import styles from './VideoPlayer.module.scss'

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSources }) => {
	const { actions, video, videoRef } = useVideo()

	const { user } = useAuth()

	//? src={`${videoSources}#t=8`} nedir?
	// burada videoSources değişkeni ile gelen video linkinin sonuna #t=8 ekleniyor. yani 8saneden başlayacak video.

	//? preload='metadata' nedir?
	// video yüklenirken video metadata bilgileri yükleniyor. bu bilgiler video uzunluğu, video boyutu, video çözünürlüğü gibi bilgileri içeriyor.

	return (
		<div
			className={cn(styles.wrapper, {
				'h-96': !user
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSources}#t=8`}
						preload='metadata'
					/>

					<div className={styles.progressBarContainer}>
						<div
							style={{ width: ` ${video.progress}%` }}
							className={styles.progressBar}
						/>
					</div>

					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name='MdHistory' />
							</button>

							<button onClick={actions.toggleVideo}>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>

							<button onClick={actions.forward}>
								<MaterialIcon name='MdUpdate' />
							</button>

							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>

						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name='MdFullscreen' />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

export default VideoPlayer
