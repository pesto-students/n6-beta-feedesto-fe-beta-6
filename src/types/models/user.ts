import faker from 'faker'
import { fakeGoogleId, fakeId } from '__mocks__/utils'
import { Organization } from './organization'

export interface User {
	_id: string
	name: string
	email: string
	googleUserId: string
	googleAvatarUrl?: string
	organizationId: string
	organization?: Organization
	isAdmin: boolean
	isVerified: boolean
	createdAt: string
	modifiedAt: string
	verifiedAt?: string
}

export function generateUser(): User {
	return {
		_id: fakeId(),
		email: faker.internet.email(),
		name: faker.name.firstName() + ' ' + faker.name.lastName(),
		isAdmin: true,
		createdAt: faker.date.past().toString(),
		modifiedAt: faker.date.past().toString(),
		isVerified: true,
		verifiedAt: faker.date.past().toString(),
		googleUserId: fakeGoogleId(),
		organizationId: fakeId(),
	}
}
