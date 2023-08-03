export const getStoreLocal = (key: string) => {
	if (typeof localStorage !== 'undefined') {
		const storage = localStorage.getItem(key)

		return storage ? JSON.parse(storage) : null
	}

	return null
}
