import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sendRequest } from 'services/networkService'

export interface Organization {
	id: number
	name: string
}

export interface OrganizationState {
	organizationList: Organization[]
}

const initialState: OrganizationState = {
	organizationList: [],
}

export const fetchOrganizationList = createAsyncThunk<Organization[]>(
	'organizations/list',
	// if you type your function argument here
	async () => {
		return await sendRequest.get<Organization[]>(`organization`)
	},
)

export const organizationSlice = createSlice({
	name: 'organization',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchOrganizationList.fulfilled, (state, action) => {
			state.organizationList = action.payload
		})
		builder.addCase(fetchOrganizationList.rejected, (state, action) => {
			console.log(action.error?.message)
		})
	},
})

// Action creators are generated for each case reducer function
// export const { } = organizationSlice.actions

export default organizationSlice.reducer
