import { Comment } from './comment'
import { User } from './user'

export interface Answer {
	_id: string
	discussionId: string
	userId?: User
	comments: Comment[]
	upvoteCount: number
	downvoteCount: number
	hasUpvoted: boolean
	hasDownvoted: boolean
	content: string
	createdAt: string
	modifiedAt: string
}
