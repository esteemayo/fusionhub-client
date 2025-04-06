import { configureStore } from '@reduxjs/toolkit';

import bannerModalReducer from './bannerModal/bannerModalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import accountMenuReducer from './accountMenu/accountMenuSlice';
import postsMenuReducer from './postsMenu/postsMenuSlice';
import accountModalReducer from './accountModal/accountModalSlice';
import postModalReducer from './postModal/postModalSlice';
import commentModalReducer from './commentModal/commentModalSlice';
import updateModalReducer from './updateModal/updateModalSlice';
import postMenuActionsReducer from './postMenuActions/postMenuActionsSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    postsMenu: postsMenuReducer,
    postMenuActions: postMenuActionsReducer,
    postModal: postModalReducer,
    accountModal: accountModalReducer,
    accountMenu: accountMenuReducer,
    commentModal: commentModalReducer,
    updateModal: updateModalReducer,
    bannerModal: bannerModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
