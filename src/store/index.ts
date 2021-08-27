import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/authSlice'
import organizationReducer from './modules/organization/organizationSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		organization: organizationReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
