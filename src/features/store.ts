import { configureStore } from '@reduxjs/toolkit';

import bannerModalReducer from './bannerModal/bannerModalSlice';
import authReducer from './auth/authSlice';
import updateModalReducer from './updateModal/updateModalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import accountMenuReducer from './accountMenu/accountMenuSlice';
import postsMenuReducer from './postsMenu/postsMenuSlice';
import accountModalReducer from './accountModal/accountModalSlice';
import postModalReducer from './postModal/postModalSlice';
import commentModalReducer from './commentModal/commentModalSlice';
import imageModalReducer from './imageModal/imageModalSlice';
import replyCommentModalReducer from './replyCommentModal/replyCommentModalSlice';
import postMenuActionsReducer from './postMenuActions/postMenuActionsSlice';

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
    updateModal: updateModalReducer,
    bannerModal: bannerModalReducer,
    imageModal: imageModalReducer,
    replyCommentModal: replyCommentModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
