import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'
import { User } from '../userSlice'

export const fetchUserList = createAsyncThunk<User[]>('users', async () => {
	return await sendRequest.get<User[]>(`user`)
})
