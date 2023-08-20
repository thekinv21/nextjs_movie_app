import Profile from '@/components/screens/profile/Profile'

import { NextPageAuth } from '@/shared/types/auth.interface'

const ProfilePage: NextPageAuth = () => {
	return <Profile />
}

// bu sadece user için özgü sayfa
// bu profiller server tarafta gözükmeyecektir
// sadece client tarafta render edilir

ProfilePage.isOnlyUser = true

export default ProfilePage
