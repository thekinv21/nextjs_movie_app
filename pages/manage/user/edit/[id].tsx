import UserEdit from '@/components/screens/admin/user/UserEdit'

import { NextPageAuth } from '@/shared/types/auth.interface'

const UserEditPage: NextPageAuth = () => {
	return <UserEdit />
}

UserEditPage.isOnlyUser = true

export default UserEditPage
