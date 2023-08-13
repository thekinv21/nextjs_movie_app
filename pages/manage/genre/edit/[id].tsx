import GenreEdit from '@/screens/admin/genre/GenreEdit'
import { NextPageAuth } from '@/shared/types/auth.interface'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
