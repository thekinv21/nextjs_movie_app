import { TypeMaterialIconName } from '@/shared/types/icon.types'
import { FC } from 'react'

//? önemli import : bütün iconu MaterialIcons adı altında alabiliriz

import * as MaterialIcons from 'react-icons/md'

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	//* burada iconu' name göre alıyoruz
	//* örn : <MdHome/> olarak gelmesi için  MaterialIcons[name] yazılmalı

	const IconComponent = MaterialIcons[name]

	//* icon varsa iconu return et, yok ise random icon

	return <IconComponent /> || <MaterialIcons.MdDragIndicator />
}

export default MaterialIcon
