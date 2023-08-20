import Movies from '@/screens/admin/movies/MoviesList'

import { NextPageAuth } from '@/shared/types/auth.interface'

const MoviesListPage: NextPageAuth = () => {
	return <Movies />
}

MoviesListPage.isOnlyAdmin = true

export default MoviesListPage
