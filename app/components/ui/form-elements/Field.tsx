import { forwardRef } from 'react'

import { IField } from './form.interface'

import styles from './form.module.scss'

import cn from 'classnames'

// biz bu projede  form yönetimi için reacr-hook-form kullanıyoruz
// {...regiter} inputlara böyle verebilmek için forwardRef yazmalıyız
// çok önemli bir yer

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', className, style, ...rest }, ref) => {
		return (
			<section className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input type={type} ref={ref} {...rest} />
				</label>

				{error && <div className={styles.error}>{error.message}</div>}
			</section>
		)
	}
)

// display name vermeyi unutma

Field.displayName = 'Field'

export default Field
