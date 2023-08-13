import { EditorProps } from 'draft-js'
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react'

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

// text  editor interface

type TypeEditorPropsField = EditorProps & IFieldProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
}

export interface IUploadField {
	folder?: string
	value?: string
	onChange: (...e: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}
