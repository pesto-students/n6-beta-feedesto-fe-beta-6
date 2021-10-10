import { Comment } from './comment'
import { User } from './user'

export interface Answer {
	_id: string
	discussionId: string
	userId: string
	user?: User
	comments: Comment[]
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
