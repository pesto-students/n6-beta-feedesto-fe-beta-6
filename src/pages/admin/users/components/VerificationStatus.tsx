import { Tag, TagLabel } from '@chakra-ui/react'
import { User } from 'store/modules/user/userSlice'
export enum VerificationStatuses {
	PENDING = 'Pending',
	VERIFIED = 'Verified',
	REJECTED = 'Rejected',
}

export function getVerificationStatus(user: User): VerificationStatuses {
	if (user.isVerified && user.verifiedAt) {
		return VerificationStatuses.VERIFIED
	}
	if (!user.isVerified && user.verifiedAt) {
		return VerificationStatuses.REJECTED
	}
	return VerificationStatuses.PENDING
}

const VerificationStatus = ({ user }: { user: User }) => {
	const isVerified =
		getVerificationStatus(user) === VerificationStatuses.VERIFIED
	const isRejected =
		getVerificationStatus(user) === VerificationStatuses.REJECTED

	if (isVerified)
		return (
			<Tag appearance="radio" backgroundColor="green.100">
				<div className="h-2 w-2 rounded-full bg-green-700 mr-1"></div>
				<TagLabel className="text-green-700">Verified</TagLabel>
			</Tag>
		)
	if (isRejected)
		return (
			<Tag appearance="radio" backgroundColor="red.100">
				<div className="h-2 w-2 rounded-full bg-red-700 mr-1"></div>
				<TagLabel className="text-red-700">Rejected</TagLabel>
			</Tag>
		)
	return (
		<Tag appearance="radio" backgroundColor="yellow.100">
			<div className="h-2 w-2 rounded-full bg-yellow-700 mr-1"></div>
			<TagLabel className="text-yellow-700">Pending</TagLabel>
		</Tag>
	)
}

export default VerificationStatus
