import { configureStore } from '@reduxjs/toolkit';

import accountMenuReducer from './accountMenu/accountMenuSlice';
import authReducer from './auth/authSlice';
import bannerModalReducer from './bannerModal/bannerModalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import accountModalReducer from './accountModal/accountModalSlice';
import postsMenuReducer from './postsMenu/postsMenuSlice';
import categoryModalReducer from './categoryModal/categoryModalSlice';
import postModalReducer from './postModal/postModalSlice';
import imageModalReducer from './imageModal/imageModalSlice';
import postMenuActionsReducer from './postMenuActions/postMenuActionsSlice';
import deleteModalReducer from './deleteModal/deleteModalSlice';
import replyCommentModalReducer from './replyCommentModal/replyCommentModalSlice';
import commentModalReducer from './commentModal/commentModalSlice';

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
    deleteModal: deleteModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
