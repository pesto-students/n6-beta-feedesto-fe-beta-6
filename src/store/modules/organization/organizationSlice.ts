import { createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'

export interface Organization {
	_id: number
	name: string
	userId: string
	createdAt: Date
	updatedAt: Date
}

export const fetchOrganizations = async () => {
	return await sendRequest.get<Organization[]>(`organization`)
}

export const organizationSlice = createSlice({
	name: 'organization',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
// export const { } = organizationSlice.actions

export default organizationSlice.reducer
