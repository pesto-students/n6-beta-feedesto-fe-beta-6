import dayjs from 'dayjs'
import faker from 'faker'
import { fakeId } from '__mocks__/utils'
import { Answer } from './answer'
import { Comment } from './comment'
import { Organization } from './organization'
import { User } from './user'

export interface Discussion {
	_id: string
	organizationId: string
	organization?: Organization
	title: string
	description: string
	startDate: string
	endDate: string
	participantIds: string[]
	participants?: User[]
	viewerIds: string[]
	viewers?: User[]
	isViewer: boolean
	isParticipant: boolean
	isInputAllowed: boolean
	isActionAllowed: boolean
	createdAt: string
	modifiedAt: string
}

export type DiscussionResult = User & {
	answers: Answer[]
	comments: Comment[]
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
		isInputAllowed: true,
		isActionAllowed: true,
		isParticipant: true,
		isViewer: false,
	}
}

export function generateDiscussions(count: number): Discussion[] {
	let discussions: Discussion[] = []

	for (let i = 0; i < count; i++) {
		discussions.push(generateDiscussion())
	}
	return discussions
}
