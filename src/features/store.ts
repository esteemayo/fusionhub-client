import { configureStore } from '@reduxjs/toolkit';

import deleteModalReducer from './deleteModal/deleteModalSlice';
import authReducer from './auth/authSlice';
import accountMenuReducer from './accountMenu/accountMenuSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import bannerModalReducer from './bannerModal/bannerModalSlice';
import postsMenuReducer from './postsMenu/postsMenuSlice';
import reportModalReducer from './reportModal/reportModalSlice';
import postModalReducer from './postModal/postModalSlice';
import accountModalReducer from './accountModal/accountModalSlice';
import imageModalReducer from './imageModal/imageModalSlice';
import commentModalReducer from './commentModal/commentModalSlice';
import shareModalReducer from './shareModal/shareModalSlice';
import postMenuActionsReducer from './postMenuActions/postMenuActionsSlice';
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
    categoryModal: categoryModalReducer,
    deleteModal: deleteModalReducer,
    shareModal: shareModalReducer,
    reportModal: reportModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
