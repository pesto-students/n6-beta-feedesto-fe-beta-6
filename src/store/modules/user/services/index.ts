import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { User } from '../userSlice'

export const fetchUserList = createAsyncThunk<User[]>('users', async () => {
	return await sendRequest.get<User[]>(`user`)
})

export interface UpdateUserApprovalStatusBody {
	userId: string
	status: boolean
}
export const updateUserApprovalStatus = async (
	data: UpdateUserApprovalStatusBody,
) => {
	return await sendRequest.put('user/verify', {
		body: data,
	})
}

export interface DeleteUserBody {
	_id: string
}
export const deleteUser = async (data: DeleteUserBody) => {
	return await sendRequest.delete('user', {
		body: data,
	})
}
