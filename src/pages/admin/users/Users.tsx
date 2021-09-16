import { CheckIcon, CloseIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import {
	Alert,
	AlertIcon,
	Avatar,
	Button,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Table,
	TableCaption,
	Tag,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react'
import DeleteItemDialog from 'components/DeleteItem.dialog'
import TimeAgo from 'javascript-time-ago'
import { useEffect, useRef, useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Form } from 'services/form'
import { RootState } from 'store'
import { logOutUser } from 'store/modules/auth/authSlice'
import { fetchUsers } from 'store/modules/user/userSlice'
import { FormDrawerController } from 'types/types'
import { checkSearchText } from 'utils/basic'
import { User } from 'types/models/user'
import VerificationStatus, {
	getVerificationStatus,
	VerificationStatuses,
} from './components/VerificationStatus'

export interface UpdateUserApprovalStatusBody {
	userId: string
	status: boolean
}
export interface UpdateUserGoogleIdBody {
	_id: string
	update: {
		googleUserId: string
	}
}

export interface DeleteUserBody {
	_id: string
}

const UsersPage = ({ isSuperAdmin }: { isSuperAdmin: boolean }) => {
	const timeAgo = new TimeAgo('en-US')

	const history = useHistory()
	const { user } = useSelector((state: RootState) => state)
	const dispatch = useDispatch()

	const [userList, setUserList] = useState<User[]>([])
	const [userSearchTerm, setUserSearchTerm] = useState<string>('')
	const [userStatusFilter, setUserStatusFilter] =
		useState<VerificationStatuses | null>(null)

	const fetchUserList = async () => {
		const users = await fetchUsers({ isSuperAdmin })
		setUserList(users)
	}

	const filteredUserList = () => {
		const filteredUsers = userList.filter((el) => {
			return (
				(userStatusFilter
					? userStatusFilter === getVerificationStatus(el)
					: true) &&
				checkSearchText(
					[el.name, el.email, el.organization?.name],
					userSearchTerm,
				)
			)
		})
		return filteredUsers
	}

	useEffect(() => {
		fetchUserList()
	}, [history.location.pathname])

	const updateUserApprovalStatusFormFieldsInitial: UpdateUserApprovalStatusBody =
		{
			userId: '',
			status: false,
		}
	const [
		updateUserApprovalStatusFormFields,
		setUpdateUserApprovalStatusFormFields,
	] = useState<Partial<UpdateUserApprovalStatusBody>>(
		updateUserApprovalStatusFormFieldsInitial,
	)
	const [isUserApprovalLoading, setUserApprovalLoading] =
		useState<boolean>(false)
	const [isUserRejectionLoading, setUserRejectionLoading] =
		useState<boolean>(false)
	const [isUserDeletionLoading, setUserDeletionLoading] =
		useState<boolean>(false)

	const updateUserGoogleIdFormFieldsInitial: UpdateUserGoogleIdBody = {
		_id: '',
		update: {
			googleUserId: '',
		},
	}
	const [updateUserGoogleIdFormFields, setUpdateUserGoogleIdFormFields] =
		useState<Partial<UpdateUserGoogleIdBody>>(
			updateUserGoogleIdFormFieldsInitial,
		)
	const updateUserGoogleIdModal = useDisclosure()

	const deleteUserFormFieldsInitial = {
		_id: '',
	}
	const [deleteUserFormFields, setDeleteUserFormFields] = useState<
		Partial<DeleteUserBody>
	>(deleteUserFormFieldsInitial)
	const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
	const onDeleteUserDialogClose = () => setIsDeleteUserDialogOpen(false)
	const deleteUserDialogCancelRef = useRef(null)

	const userController: {
		delete: FormDrawerController<DeleteUserBody>
		updateApprovalStatus: FormDrawerController<UpdateUserApprovalStatusBody>
		updateGoogleId: FormDrawerController<UpdateUserGoogleIdBody>
	} = {
		delete: {
			form: new Form(deleteUserFormFields),
			updateFields: (props: Partial<DeleteUserBody>) =>
				setDeleteUserFormFields({
					...deleteUserFormFields,
					...props,
				}),
			async onSubmit() {
				setUserDeletionLoading(true)
				await userController.delete.form.submit('user', {
					method: 'DELETE',
				})
				setUserDeletionLoading(false)
				await fetchUserList()
			},
		},
		updateApprovalStatus: {
			form: new Form(updateUserApprovalStatusFormFields),
			updateFields: (props: Partial<UpdateUserApprovalStatusBody>) => {
				setUpdateUserApprovalStatusFormFields({
					...updateUserApprovalStatusFormFields,
					...props,
				})
				userController.updateApprovalStatus.form.fields = {
					...updateUserApprovalStatusFormFields,
					...props,
				}
			},
			async onSubmit({
				userId,
				status,
			}: {
				userId: string
				status: boolean
			}) {
				userController.updateApprovalStatus.updateFields({
					status,
					userId,
				})
				if (status == true) {
					setUserApprovalLoading(true)
				} else {
					setUserRejectionLoading(true)
				}
				await userController.updateApprovalStatus.form.submit(
					'user/verify',
					{
						method: 'PUT',
					},
				)
				setUserApprovalLoading(false)
				setUserRejectionLoading(false)
				await fetchUserList()
			},
		},
		updateGoogleId: {
			form: new Form(updateUserGoogleIdFormFields),
			updateFields: (props: Partial<UpdateUserGoogleIdBody>) => {
				setUpdateUserGoogleIdFormFields({
					...updateUserGoogleIdFormFields,
					...props,
				})
				userController.updateGoogleId.form.fields = {
					...updateUserGoogleIdFormFields,
					...props,
				}
			},
			load(user: User) {
				userController.updateGoogleId.updateFields({
					_id: user._id,
				})
				updateUserGoogleIdModal.onOpen()
			},
			async onSubmit() {
				const updatedId =
					userController.updateGoogleId.form.fields.update
						?.googleUserId
				await userController.updateGoogleId.form.submit('user', {
					method: 'PUT',
				})
				await fetchUserList()
				updateUserGoogleIdModal.onClose()
				if (updatedId === user.currentUser.googleUserId) {
					dispatch(logOutUser())
				}
			},
		},
	}

	return (
		<div>
			<div className="px-6 py-3 flex justify-between items-center">
				<div className="flex-none">
					<div className="text-3xl text-gray-700 font-semibold">
						Users {isSuperAdmin ? '(Super Admin)' : null}
					</div>
					<div className="text-gray-600">
						Here you will see all the available users
					</div>
				</div>
				<div className="flex-none">
					<div className="flex items-center">
						<Select
							placeholder="All Users"
							onChange={(evt) => {
								setUserStatusFilter(
									evt.target.value as VerificationStatuses,
								)
							}}
							value={userStatusFilter ?? undefined}
						>
							{Object.values(VerificationStatuses).map((el) => (
								<option value={el} key={el}>
									{el}
								</option>
							))}
						</Select>
						<InputGroup className="ml-2">
							<Input
								variant="outline"
								placeholder="Search"
								value={userSearchTerm}
								onChange={(e) =>
									setUserSearchTerm(e.target.value)
								}
							/>
							<InputRightElement>
								<SearchIcon color="gray.500" />
							</InputRightElement>
						</InputGroup>
					</div>
				</div>
			</div>
			<div className="border-b-2"></div>
			{isSuperAdmin ? (
				<div className="m-3">
					<Alert status="warning" rounded="lg" variant="left-accent">
						<AlertIcon />
						<div>
							<div>This section is for demo purpose only.</div>
							<div className="text-gray-700 text-sm">
								You can change the binding of a Google User to
								any System User here. Later, this function will
								be covered in separate Super-Admin panel.
							</div>
						</div>
					</Alert>
				</div>
			) : null}
			<div className="mt-3">
				<Table variant="simple">
					{!filteredUserList().length && (
						<TableCaption>These were all the Users</TableCaption>
					)}
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Email</Th>
							<Th>Status</Th>
							<Th>Registered At</Th>
							<Th textAlign="right">Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredUserList().map((user) => (
							<Tr key={user._id}>
								<Td>
									<div className="flex items-center">
										<Avatar
											src={user.googleAvatarUrl}
											size="sm"
										/>
										<div className="px-2">
											<div className="flex items-center">
												<div>{user.name}</div>
												{user.isAdmin ? (
													<Tag
														colorScheme="red"
														className="ml-2"
													>
														Admin
													</Tag>
												) : null}
											</div>
											<div className="text-xs text-gray-600">
												Google ID:{' '}
												{user.googleUserId || 'N/A'}
											</div>
										</div>
									</div>
								</Td>
								<Td>
									<div>{user.email}</div>
									<div className="text-xs text-gray-600">
										Organization: {user.organization?.name}
									</div>
								</Td>
								<Td>
									<VerificationStatus user={user} />
								</Td>
								<Td>
									{timeAgo.format(new Date(user.createdAt))}
								</Td>
								<Td textAlign="right">
									{isSuperAdmin ? (
										<IconButton
											aria-label="link"
											icon={<Icon.Link size={24} />}
											size="sm"
											backgroundColor={
												user.googleUserId
													? 'green.600'
													: 'green.100'
											}
											_hover={{
												backgroundColor:
													user.googleUserId
														? 'green.500'
														: 'green.200',
											}}
											color={
												user.googleUserId
													? 'green.100'
													: 'green.600'
											}
											className="shadow"
											onClick={() =>
												userController.updateGoogleId.load?.(
													user,
												)
											}
										/>
									) : (
										<>
											<IconButton
												aria-label="approve"
												icon={<CheckIcon />}
												size="sm"
												isLoading={
													updateUserApprovalStatusFormFields.userId ==
														user._id &&
													isUserApprovalLoading
												}
												backgroundColor={
													user.isVerified &&
													user.verifiedAt
														? 'green.600'
														: 'green.100'
												}
												_hover={{
													backgroundColor:
														user.isVerified &&
														user.verifiedAt
															? 'green.500'
															: 'green.200',
												}}
												color={
													user.isVerified &&
													user.verifiedAt
														? 'green.100'
														: 'green.600'
												}
												className="shadow"
												onClick={() =>
													userController.updateApprovalStatus.onSubmit(
														{
															userId: user._id,
															status: true,
														},
													)
												}
											/>
											<IconButton
												aria-label="reject"
												icon={<CloseIcon />}
												size="sm"
												isLoading={
													updateUserApprovalStatusFormFields.userId ==
														user._id &&
													isUserRejectionLoading
												}
												backgroundColor={
													!user.isVerified &&
													user.verifiedAt
														? 'red.600'
														: 'red.100'
												}
												_hover={{
													backgroundColor:
														!user.isVerified &&
														user.verifiedAt
															? 'red.500'
															: 'red.200',
												}}
												color={
													!user.isVerified &&
													user.verifiedAt
														? 'red.100'
														: 'red.600'
												}
												className="mx-2 shadow"
												onClick={() =>
													userController.updateApprovalStatus.onSubmit(
														{
															userId: user._id,
															status: false,
														},
													)
												}
											/>
											<IconButton
												aria-label="delete"
												icon={<DeleteIcon />}
												size="sm"
												backgroundColor="red.100"
												_hover={{
													backgroundColor: 'red.200',
												}}
												color="red.600"
												className="shadow"
												onClick={() => {
													userController.delete.updateFields(
														{
															_id: user._id,
														},
													)
													setIsDeleteUserDialogOpen(
														true,
													)
												}}
											/>
										</>
									)}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
			<DeleteItemDialog
				title="Delete User"
				isOpen={isDeleteUserDialogOpen}
				cancelRef={deleteUserDialogCancelRef}
				onCancel={onDeleteUserDialogClose}
				onDelete={() => {
					onDeleteUserDialogClose()
					userController.delete.onSubmit()
				}}
			/>
			{isSuperAdmin ? (
				<Modal
					isOpen={updateUserGoogleIdModal.isOpen}
					onClose={updateUserGoogleIdModal.onClose}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Update User Google Account</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Google Account</FormLabel>
								<Select
									placeholder="Select Google Account"
									onChange={(evt) => {
										userController.updateGoogleId.updateFields(
											{
												update: {
													googleUserId:
														evt.target.value,
												},
											},
										)
									}}
								>
									{userList
										.filter(
											(el) =>
												el.googleUserId &&
												!isNaN(+el.googleUserId),
										)
										.map((el) => (
											<option
												value={el.googleUserId}
												key={el._id}
											>
												{el.name} - {el.email}
											</option>
										))}
								</Select>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={() =>
									userController.updateGoogleId.onSubmit()
								}
								isLoading={isUserDeletionLoading}
							>
								Save
							</Button>
							<Button onClick={updateUserGoogleIdModal.onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			) : null}
		</div>
	)
}

export default UsersPage
