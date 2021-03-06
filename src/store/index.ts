import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/authSlice'
import organizationReducer from './modules/organization/organizationSlice'
import userReducer from './modules/user/userSlice'
import discussionReducer from './modules/discussion/discussionSlice'
import answerReducer from './modules/answer/answerSlice'
import commentReducer from './modules/comment/commentSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		organization: organizationReducer,
		user: userReducer,
		discussion: discussionReducer,
		answer: answerReducer,
		comment: commentReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
