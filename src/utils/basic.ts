export const checkSearchText = (
	origin: string | string[],
	searchTerm: string,
) => {
	let searchFlag = false
	if (typeof origin === 'string') {
		origin = [origin]
	}
	origin.forEach((el) => {
		if (
			el.trim().toUpperCase().indexOf(searchTerm.trim().toUpperCase()) >
			-1
		) {
			searchFlag = true
		}
	})
	return searchFlag
}
