import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counter.slice'
import userReducer from './user/user.slice'

// redux store 
export const store = configureStore({
  reducer: {
    count : counterReducer,
    user: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch