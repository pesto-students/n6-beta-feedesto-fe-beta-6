import faker from 'faker'

export function fakeId(): string {
	return faker.random.alpha({ count: 10, upcase: false })
}
export function fakeGoogleId(): string {
	return faker.datatype
		.number({ min: 100000000000, max: 9999999999 })
		.toString()
}
