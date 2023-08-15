import { emailRegex } from '@/shared/regex/emailRegex'

import Field from '@/ui/form-elements/Field'

import { FC } from 'react'

import { FormState, UseFormRegister } from 'react-hook-form'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<{ email: string; password: string }>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'E-mail is Required...',
					pattern: {
						value: emailRegex,
						message: 'Please enter a valid e-mail'
					}
				})}
				placeholder='E-mail'
				autoComplete='off'
				error={errors.email}
			/>

			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is Required...',
								minLength: {
									value: 6,
									message: 'Min length should be more 6 symbols..'
								}
						  }
						: {}
				)}
				placeholder='Password'
				type='password'
				error={errors.password}
			/>
		</>
	)
}

export default AuthFields
