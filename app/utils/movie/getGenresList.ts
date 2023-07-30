export const getGenresListEach = (
	index: number,
	lenght: number,
	name: string
) => (index + 1 === lenght ? name : name + ',')
