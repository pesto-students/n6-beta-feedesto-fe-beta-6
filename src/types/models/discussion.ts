import dayjs from 'dayjs'
import faker from 'faker'
import { fakeId } from '__mocks__/utils'
import { User } from './user'

export interface Discussion {
	_id: string
	organizationId: string
	title: string
	description: string
	startDate: string
	endDate: string
	participantIds: string[]
	viewerIds: string[]
	createdAt: string
	modifiedAt: string
}

export interface DiscussionResult {
	_id: string
	content: string
	discussionId: string
	userId: User
	upvoteIds: string[]
	downvoteIds: string[]
	commentIds: string[]
	createdAt: string
	modifiedAt: string
	numberOfUpvotes: number
	numberOfDownvotes: number
	score: number
}

export function generateDiscussion(): Discussion {
	const title = faker.random.words()
	const description = faker.lorem.paragraphs(3)
	const startDate = faker.date
		.between(
			dayjs().subtract(15, 'days').toDate(),
			dayjs().add(15, 'days').toDate(),
		)
		.toString()
	const endDate = faker.date
		.between(
			dayjs().subtract(15, 'days').toDate(),
			dayjs().add(15, 'days').toDate(),
		)
		.toString()
	return {
		_id: fakeId(),
		title,
		startDate,
		endDate,
		viewerIds: [],
		participantIds: [],
		description,
		createdAt: faker.date.past().toString(),
		modifiedAt: faker.date.past().toString(),
		organizationId: fakeId(),
	}
}

export function generateDiscussions(count: number): Discussion[] {
	let discussions: Discussion[] = []

	for (let i = 0; i < count; i++) {
		discussions.push(generateDiscussion())
	}
	return discussions
}
