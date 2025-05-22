import { format } from 'timeago.js';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import LikeIcon from '../LikeIcon';
import DislikeIcon from '../DislikeIcon';

import { useFavourite } from '../../hooks/useFavourite';
import { useAppSelector } from '../../hooks/hooks';
import { useSavedPosts } from '../../hooks/useSavedPosts';

import { PostDetailActionProps } from '../../types';

import './PostDetailAction.scss';

const PostDetailAction = ({ post }: PostDetailActionProps) => {
  const postId = useMemo(() => {
    return post._id;
  }, [post]);

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isSaved, saveMutation, handleSave } = useSavedPosts(postId);
  const {
    isLiked,
    isDisliked,
    likeMutation,
    disLikeMutation,
    handleLike,
    handleDislike,
  } = useFavourite(post, currentUser!);

  return (
    <div className='post-detail-action'>
      <div className='post-detail-action__container'>
        <div className='post-detail-action__user'>
          <div className='post-detail-action__wrapper'>
            <div className='post-detail-action__wrapper--username'>
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
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
              <Link to={`/accounts/profile?username=${post?.author.username}`}>
                <span>{post?.author.name}</span>
              </Link>
            </div>
            <div className='post-detail-action__wrapper--date'>
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
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <time dateTime={post?.createdAt}>{format(post?.createdAt)}</time>
            </div>
          </div>
          <div className='post-detail-action__view'>
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
                d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
            <span>{millify(post?.views)} views</span>
          </div>
        </div>
        <div className='post-detail-action__actions'>
          <div className='post-detail-action__actions--likes'>
            <div className='post-detail-action__actions--buttons'>
              <button
                type='button'
                onClick={handleLike}
                disabled={likeMutation.isPending || isLiked}
              >
                <LikeIcon isLiked={isLiked} />
                <span>{post?.likeCount}</span>
              </button>
              <button
                type='button'
                onClick={handleDislike}
                disabled={disLikeMutation.isPending || isDisliked}
              >
                <DislikeIcon isDisliked={isDisliked} />
                <span>{post?.dislikeCount}</span>
              </button>
            </div>
            <a
              href='#comments'
              className='post-detail-action__actions--comment-link'
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
                  d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
                />
              </svg>
              <span>{post?.comments.length}</span>
            </a>
          </div>
          <div className='post-detail-action__actions--share'>
            {currentUser?.role !== 'admin' && (
              <button
                type='button'
                onClick={handleSave}
                disabled={saveMutation.isPending}
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
                    d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                    fill={
                      saveMutation.isPending
                        ? isSaved
                          ? 'none'
                          : '#dddcdc'
                        : isSaved
                        ? '#dddcdc'
                        : 'none'
                    }
                  />
                </svg>
              </button>
            )}
            <button type='button'>
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
                  d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailAction;
