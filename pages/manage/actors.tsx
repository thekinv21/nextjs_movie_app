import Actors from '@/screens/admin/actors/ActorsList'

import { NextPageAuth } from '@/shared/types/auth.interface'

const ActorsListPage: NextPageAuth = () => {
	return <Actors />
}

ActorsListPage.isOnlyAdmin = true

export default ActorsListPage
