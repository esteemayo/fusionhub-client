import parse from 'html-react-parser';
import millify from 'millify';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import LikeIcon from '../LikeIcon';
import Image from '../Image';
import SaveIcon from '../SaveIcon';

import Badge from '../badge/Badge';
import DislikeIcon from '../DislikeIcon';

import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as deleteModal from '../../features/deleteModal/deleteModalSlice';
import * as postModal from '../../features/postModal/postModalSlice';
import * as replyCommentModal from '../../features/replyCommentModal/replyCommentModalSlice';

import { ArticleProps } from '../../types';
import { excerpts } from '../../utils';
import { dislikePost, likePost } from '../../services/postService';

import './Article.scss';

const createLikePost = async (postId: string) => {
  const { data } = await likePost(postId);
  return data;
};

const createDislikePost = async (postId: string) => {
  const { data } = await dislikePost(postId);
  return data;
};

const Article = ({ post, userId, queryKey }: ArticleProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { formattedDate } = useDate(post.createdAt);
  const { isSaved, saveMutation, handleSave } = useSavedPosts(post._id);

  const likeMutation = useMutation({
    mutationFn: () => createLikePost(post._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, userId] });
    },
  });

  const disLikeMutation = useMutation({
    mutationFn: () => createDislikePost(post._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, userId] });
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/posts/${post.slug}`);
  };

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setPostId(post._id));
  };

  const handleLike = () => {
    if (!currentUser) {
      return null;
    }

    likeMutation.mutate();
  };

  const handleDislike = () => {
    if (!currentUser) {
      return null;
    }

    disLikeMutation.mutate();
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(postModal.setPost(post));
    dispatch(postModal.onOpen());
    dispatch(postModal.setPostQueryKey(queryKey));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    dispatch(deleteModal.setQueryKey(queryKey));
    dispatch(deleteModal.setDeletePostId(post._id));
  };

  const parsedDesc = useMemo(() => {
    return parse(excerpts(String(post.desc), 250)).toString();
  }, [post.desc]);

  const isLiked = useMemo(() => {
    return !!post.likes.some((id) => id === currentUser?.details._id);
  }, [post, currentUser?.details._id]);

  const isDisliked = useMemo(() => {
    return !!post.dislikes.some((id) => id === currentUser?.details._id);
  }, [post, currentUser?.details._id]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser?.role]);

  const postAuthorId = useMemo(() => {
    return post.author._id;
  }, [post.author._id]);

  const currentUserId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser?.details._id]);

  const isPostAuthor = useMemo(() => {
    return postAuthorId === currentUserId;
  }, [postAuthorId, currentUserId]);

  const url = useMemo(() => {
    return postAuthorId === currentUserId
      ? '#'
      : `/accounts/profile?username=${post.author.username}`;
  }, [currentUserId, post.author.username, postAuthorId]);

  const actionBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'article__actions--edit-remove hide';
    }

    if (isAdmin) {
      if (isPostAuthor) {
        return 'article__actions--edit-remove show';
      }

      if (post.author.role === 'admin') {
        return 'article__actions--edit-remove hide';
      }

      return 'article__actions--edit-remove show';
    }

    return 'article__actions--edit-remove hide';
  }, [currentUser, isAdmin, isPostAuthor, post.author.role]);

  return (
    <article className='article'>
      <div className='article__container'>
        <Link to={url} className='article__cover'>
          <Image
            src={post.author.image ?? '/user-default.jpg'}
            width={60}
            height={60}
            alt='avatar'
            className='article__cover--img'
          />
        </Link>
        <div className='article__wrapper'>
          <div className='article__profile'>
            <Link to={url}>
              <span className='article__profile--name'>{post.author.name}</span>
            </Link>
            <Badge role={post.author.role} />
            <div className='article__profile--username'>
              <Link to={url}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25'
                  />
                </svg>
                <span>{post.author.username}</span>
              </Link>
            </div>
            <span className='article__profile--dot'>•</span>
            <time dateTime={post.createdAt} className='article__profile--time'>
              {formattedDate}
            </time>
          </div>
          <div className='article__desc'>
            {parse(parsedDesc)}
            <button type='button' onClick={handleClick}>
              more
            </button>
          </div>
          <div className='article__actions'>
            <div className='article__actions--group'>
              <div className='article__actions--comments'>
                <button type='button' onClick={handleComment}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    aria-label='Comments'
                    aria-hidden='true'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    role='img'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
                    />
                  </svg>
                  {post.comments.length > 0 && (
                    <span>{millify(post.comments.length)}</span>
                  )}
                </button>
              </div>
              <div className='article__actions--likes'>
                <button
                  type='button'
                  onClick={handleLike}
                  disabled={likeMutation.isPending}
                >
                  <LikeIcon liked={isLiked} />
                  {post.likeCount > 0 && <span>{millify(post.likeCount)}</span>}
                </button>
              </div>
              <div className='article__actions--dislikes'>
                <button
                  type='button'
                  onClick={handleDislike}
                  disabled={disLikeMutation.isPending}
                >
                  <DislikeIcon disliked={isDisliked} />
                  {post.dislikeCount > 0 && (
                    <span>{millify(post.dislikeCount)}</span>
                  )}
                </button>
              </div>
              <div className='article__actions--saved-post'>
                <button
                  type='button'
                  onClick={handleSave}
                  disabled={saveMutation.isPending || isAdmin}
                >
                  <SaveIcon
                    isLoading={saveMutation.isPending}
                    hasSaved={isSaved}
                  />
                  {post.savedCount > 0 && <span>{post.savedCount}</span>}
                </button>
              </div>
            </div>
            <div className={actionBtnClasses}>
              <button
                type='button'
                onClick={handleUpdate}
                className='article__actions--update'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={handleDelete}
                className='article__actions--remove'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
