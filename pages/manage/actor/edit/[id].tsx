import ActorEdit from '@/screens/admin/actor/ActorEdit'
import { NextPageAuth } from '@/shared/types/auth.interface'

const ActorEditPage: NextPageAuth = () => {
	return <ActorEdit />
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
