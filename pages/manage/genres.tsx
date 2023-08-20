import Genres from '@/screens/admin/genres/GenresList'

import { NextPageAuth } from '@/shared/types/auth.interface'

const GenresListPage: NextPageAuth = () => {
	return <Genres />
}

GenresListPage.isOnlyAdmin = true

export default GenresListPage
