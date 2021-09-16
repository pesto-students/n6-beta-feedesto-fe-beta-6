import { User } from './user'

export interface Comment {
	_id: string
	answerId: string
	userId?: User
	upvoteCount: number
	downvoteCount: number
	hasUpvoted: boolean
	hasDownvoted: boolean
	content: string
	createdAt: string
	modifiedAt: string
}
