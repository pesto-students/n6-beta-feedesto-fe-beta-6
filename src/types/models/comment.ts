import { User } from './user'

export interface Comment {
	_id: string
	answerId: string
	userId: string
	user?: User
	upvoteCount: number
	upvoters?: User[]
	downvoteCount: number
	downvoters?: User[]
	hasUpvoted: boolean
	hasDownvoted: boolean
	content: string
	createdAt: string
	modifiedAt: string
}
