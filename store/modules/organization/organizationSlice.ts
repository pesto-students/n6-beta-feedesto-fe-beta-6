import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginType, SelectedTab } from 'types/enums'

export interface Organization {
	id: number
	name: string
	login: string
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
		const response = await fetch(`https://api.github.com/users`)
		return (await response.json()) as Organization[]
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
			alert(action.error?.message)
		})
	},
})

// Action creators are generated for each case reducer function
export const {} = organizationSlice.actions

export default organizationSlice.reducer
