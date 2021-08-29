import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { AddDiscussionBody, fetchDiscussionList } from './services'

export interface Discussion {
	id: string
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
export interface DiscussionState {
	discussionList: Discussion[]
	addDiscussionForm: AddDiscussionBody
}

const initialState: DiscussionState = {
	discussionList: [],
	addDiscussionForm: {
		title: '',
		description: '',
		startDate: '',
		endDate: '',
		participantIds: [],
		viewerIds: [],
	},
}

export const discussionSlice = createSlice({
	name: 'discussion',
	initialState,
	reducers: {
		fillAddDiscussionFormFields: (
			state,
			{
				payload: {
					title,
					description,
					endDate,
					participantIds,
					startDate,
					viewerIds,
				},
			}: PayloadAction<Partial<AddDiscussionBody>>,
		) => {
			if (!_.isUndefined(title)) state.addDiscussionForm.title = title
			if (!_.isUndefined(description))
				state.addDiscussionForm.description = description
			if (!_.isUndefined(endDate))
				state.addDiscussionForm.endDate = endDate
			if (!_.isUndefined(participantIds))
				state.addDiscussionForm.participantIds = participantIds
			if (!_.isUndefined(startDate))
				state.addDiscussionForm.startDate = startDate
			if (!_.isUndefined(viewerIds))
				state.addDiscussionForm.viewerIds = viewerIds
		},
		resetAddDiscussionFormFields: (state) => {
			state.addDiscussionForm = initialState.addDiscussionForm
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDiscussionList.fulfilled, (state, action) => {
			state.discussionList = action.payload
		})
		builder.addCase(fetchDiscussionList.rejected, (state, action) => {
			console.log(action.error?.message)
		})
	},
})

// Action creators are generated for each case reducer function
export const { fillAddDiscussionFormFields } = discussionSlice.actions

export default discussionSlice.reducer
export * from './services'
