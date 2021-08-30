import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { AddAnswerBody, fetchAnswerList } from './services'

export interface Answer {
	id: string
	discussionId: string
	userId: string
	content: string
	createdAt: string
	modifiedAt: string
}
export interface AnswerState {
	answerList: Answer[]
	addAnswerForm: AddAnswerBody
}

const initialState: AnswerState = {
	answerList: [],
	addAnswerForm: {
		content: '',
		discussionId: '',
	},
}

export const answerSlice = createSlice({
	name: 'answer',
	initialState,
	reducers: {
		fillAddAnswerFormFields: (
			state,
			{
				payload: { content, discussionId, userId },
			}: PayloadAction<Partial<AddAnswerBody>>,
		) => {
			if (!_.isUndefined(content)) state.addAnswerForm.content = content
			if (!_.isUndefined(discussionId))
				state.addAnswerForm.discussionId = discussionId
			if (!_.isUndefined(userId)) state.addAnswerForm.userId = userId
		},
		resetAddAnswerFormFields: (state) => {
			state.addAnswerForm = initialState.addAnswerForm
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAnswerList.fulfilled, (state, action) => {
			state.answerList = action.payload
		})
		builder.addCase(fetchAnswerList.rejected, (state, action) => {
			console.log(action.error?.message)
		})
	},
})

// Action creators are generated for each case reducer function
export const { fillAddAnswerFormFields, resetAddAnswerFormFields } =
	answerSlice.actions

export default answerSlice.reducer
export * from './services'
