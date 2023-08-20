import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { IVideoElement } from './video.types'

export const useVideo = () => {
	// başta hiçbir şe olmayacak

	const videoRef = useRef<IVideoElement>(null)

	// video durumu
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

	// video current time

	const [currentTime, setCurrentTime] = useState<number>(0)

	// video duration

	const [videoTime, setVideoTime] = useState<number>(0)

	// progress bar

	const [progress, setProgress] = useState<number>(0)

	// component mount edildiğinde video durumunu kontrol et ve video durumunu set et

	useEffect(() => {
		const videoDuration = videoRef.current?.duration
		// eğer videonun durationu varsa ve setVideoTime'a at
		if (videoDuration) {
			setVideoTime(videoDuration)
		}
	}, [videoRef.current?.duration])

	// video oynatma ve durdurma fonksiyonu
	const toggleVideo = useCallback(() => {
		// eğer video oynatılmıyorsa oynat ve isPlaying'i true yap
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		}
		// eğer video oynatılıyorsa durdur ve isPlaying'i false yap
		else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	// video kaydırma fonksiyonu +10sn
	const forward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10
		}
	}

	// video kaydırma fonksiyonu -10sn
	const revert = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10
		}
	}

	// full screen fonksiyonu

	const fullScreen = () => {
		const video = videoRef.current

		if (!video) return

		// farklı tarayıcılar için full screen fonksiyonu

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	// progress bar fonksiyonu

	useEffect(() => {
		// videoyu al
		const video = videoRef.current

		// eğer video yoksa dön
		if (!video) return

		const updateProgress = () => {
			// videonun şuanki zamanını al
			setCurrentTime(video.currentTime)

			// videonun zamanı bölü videonun toplam süresi ve 100 ile çarpımı videonun şuanki zamanını bulmamızı sağlar
			setProgress((video.currentTime / video.duration) * 100)
		}

		// videonun zamanını güncelle

		video.addEventListener('timeupdate', updateProgress)

		// bu fonksiyonu temizle
		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])

	// hostkeys fonksiyonu

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				// eğer basılan tuşun değeri space left ise revert fonksiyonunu çalıştır
				case 'ArrowLeft':
					revert()
					break

				// eğer basılan tuşun değeri space right ise forward fonksiyonunu çalıştır
				case 'ArrowRight':
					forward()
					break

				//eğer basılan tuşun değeri space ise toggleVideo fonksiyonunu çalıştır
				case ' ': {
					e.preventDefault()
					toggleVideo()
					break
				}

				case 'f': {
					fullScreen()
					break
				}

				default:
					return
			}

			document.addEventListener('keydown', handleKeyDown)

			return () => {
				document.removeEventListener('keydown', handleKeyDown)
			}
		}
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			actions: {
				revert,
				forward,
				toggleVideo,
				fullScreen
			},

			video: {
				isPlaying,
				currentTime,
				videoTime,
				progress
			}
		}),
		[isPlaying, currentTime, videoTime, progress]
	)
}
