import { configureStore } from '@reduxjs/toolkit';

import postsMenuReducer from './postsMenu/postsMenuSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import accountModalReducer from './accountModal/accountModalSlice';
import postModalReducer from './postModal/postModalSlice';
import postActionMenuReducer from './postActionMenu/postActionMenuSlice';
import accountMenuReducer from './accountMenu/accountMenuSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    postsMenu: postsMenuReducer,
    postActionMenu: postActionMenuReducer,
    postModal: postModalReducer,
    accountModal: accountModalReducer,
    accountMenu: accountMenuReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
