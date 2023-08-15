import { FC, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { IAuthInput } from './auth.interface'

import styles from './Auth.module.scss'

import Button from '@/ui/form-elements/Button'

import Heading from '@/ui/heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import Meta from '@/utils/meta/Meta'
import AuthFields from './auth-field/AuthFields'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
	useAuthRedirect()

	// user auth oldumu bilgisi

	const { isLoading } = useAuth()

	const { login, register } = useActions()

	// iki taraflı çalışması için hem login hemde register
	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: RegisterInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({
		mode: 'onChange'
	})

	const { errors } = formState

	const onSubmit: SubmitHandler<IAuthInput> = data => {
		if (type === 'login') {
			login(data)
		} else if (type === 'register') {
			register(data)
		}
	}

	return (
		<Meta title='Auth'>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title='Authentication!' className='mb-6' />

					{/* fields */}

					<AuthFields
						formState={formState}
						register={RegisterInput}
						isPasswordRequired
					/>

					<div className={styles.buttons}>
						<Button
							type='submit'
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>

						<Button
							type='submit'
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
