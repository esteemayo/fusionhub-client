import { configureStore } from '@reduxjs/toolkit';

import accountMenuReducer from './accountMenu/accountMenuSlice';
import authReducer from './auth/authSlice';
import bannerModalReducer from './bannerModal/bannerModalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import accountModalReducer from './accountModal/accountModalSlice';
import postsMenuReducer from './postsMenu/postsMenuSlice';
import commentModalReducer from './commentModal/commentModalSlice';
import postModalReducer from './postModal/postModalSlice';
import postMenuActionsReducer from './postMenuActions/postMenuActionsSlice';
import imageModalReducer from './imageModal/imageModalSlice';
import replyCommentModalReducer from './replyCommentModal/replyCommentModalSlice';
import categoryModalReducer from './categoryModal/categoryModalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    postsMenu: postsMenuReducer,
    postMenuActions: postMenuActionsReducer,
    postModal: postModalReducer,
    accountModal: accountModalReducer,
    accountMenu: accountMenuReducer,
    commentModal: commentModalReducer,
    bannerModal: bannerModalReducer,
    imageModal: imageModalReducer,
    replyCommentModal: replyCommentModalReducer,
    categoryModal: categoryModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
