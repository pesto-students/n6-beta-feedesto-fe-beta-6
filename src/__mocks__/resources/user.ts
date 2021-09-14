import { User } from 'store/modules/user/userSlice'
import faker from 'faker'
import { fakeGoogleId, fakeId } from '__mocks__/utils'

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
