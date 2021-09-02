import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import {} from './services'

export interface Discussion {
	_id: string
	organizationId: string
	title: string
	description: string
	startDate: string
	endDate: string
	participantIds: string[]
	viewerIds: string[]
	createdAt: string
	modifiedAt: string
}

export const discussionSlice = createSlice({
	name: 'discussion',
	initialState: {},
	reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = discussionSlice.actions

export default discussionSlice.reducer
export * from './services'
