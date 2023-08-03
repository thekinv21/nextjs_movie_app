import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'

import { FieldError } from 'react-hook-form'

// button interface
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

// input ınterface

export interface IFieldProps {
	placeholder?: string
	error?: FieldError | undefined
}

type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputProps {}
