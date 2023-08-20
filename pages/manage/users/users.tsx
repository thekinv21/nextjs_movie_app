import Users from '@/screens/admin/users/Users'

import { NextPageAuth } from '@/shared/types/auth.interface'

const UsersPage: NextPageAuth = () => {
	return <Users />
}

UsersPage.isOnlyAdmin = true

export default UsersPage
