import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { ActorsService } from '@/services/actor/actor.service'

export const useAdminActors = () => {
	const queryData = useQuery('list of actor', () => ActorsService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id
				})
			),
		onError(error) {}
	})

	return queryData
}
