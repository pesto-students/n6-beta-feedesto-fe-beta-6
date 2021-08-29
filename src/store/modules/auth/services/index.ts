import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'

export interface LoginUserBody {
	googleUserId: string
}
export const loginUser = createAsyncThunk<any, LoginUserBody>(
	'auth/login',
	async (data) => {
		return await sendRequest.post('auth/login', {
			body: data,
		})
	},
)
export interface RegisterUserBody {
	name: string
	email: string
	googleUserId: string
	organizationId: string
}
export const registerUser = createAsyncThunk<any, RegisterUserBody>(
	'auth/register/user',
	async (data) => {
		return await sendRequest.post('auth/register/user', {
			body: data,
		})
	},
)

export interface RegisterOrganizationBody {
	name: string
	organizationName: string
	email: string
	googleUserId: string
}

export const registerOrganization = createAsyncThunk<
	any,
	RegisterOrganizationBody
>('auth/register/organization', async (data) => {
	return await sendRequest.post('auth/register/organization', {
		body: data,
	})
})
