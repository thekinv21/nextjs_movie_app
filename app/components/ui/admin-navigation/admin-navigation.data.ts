import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config'

import { INavItem } from './admin-navigation.interface'

export const navItems: INavItem[] = [
	{
		title: 'Statistics',
		link: getAdminHomeUrl()
	},
	{
		title: 'Users',
		link: getAdminUrl('users/users')
	},
	{
		title: 'Movies',
		link: getAdminUrl('movies/movies')
	},
	{
		title: 'Actors',
		link: getAdminUrl('actors/actors')
	},
	{
		title: 'Genres',
		link: getAdminUrl('genres/genres')
	}
]
