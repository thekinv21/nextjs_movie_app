import { FC } from 'react'

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, Zoom } from 'react-toastify'

const ToastProvider: FC = () => {
	return (
		<ToastContainer
			autoClose={2000}
			position='top-center'
			pauseOnHover={false}
			transition={Zoom}
			theme='dark'
		/>
	)
}

export default ToastProvider
