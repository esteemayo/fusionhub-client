import { ICanShowMenu } from '../types';

export const canShowMenu: ICanShowMenu = (currentUser, author) => {
  if (!currentUser || !author) return;

  const authorId = author._id;
  const userId = currentUser.details._id;

  const isAuthorAdmin = author.role === 'admin';
  const isCurrentUserAuthor = authorId === userId;

  return !isAuthorAdmin || isCurrentUserAuthor;
};
