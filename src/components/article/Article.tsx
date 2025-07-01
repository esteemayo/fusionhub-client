import parse from 'html-react-parser';
import millify from 'millify';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Badge from '../badge/Badge';
import Image from '../Image';
import LikeIcon from '../LikeIcon';
import SaveIcon from '../SaveIcon';
import DislikeIcon from '../DislikeIcon';

import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { dislikePost, likePost } from '../../services/postService';
import * as replyCommentModal from '../../features/replyCommentModal/replyCommentModalSlice';

import { excerpts } from '../../utils';
import { ArticleProps } from '../../types';

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

  const parsedDesc = useMemo(() => {
    return parse(excerpts(String(post.desc), 250)).toString();
  }, [post.desc]);

  const isLiked = useMemo(() => {
    return !!post.likes.some((id) => id === currentUser?.details._id);
  }, [post, currentUser?.details._id]);

  const isDisliked = useMemo(() => {
    return !!post.dislikes.some((id) => id === currentUser?.details._id);
  }, [post, currentUser?.details._id]);

  return (
    <article className='article'>
      <div className='article__container'>
        <div className='article__cover'>
          <Image
            src={post.author.image ?? '/user-default.jpg'}
            width={60}
            height={60}
            alt='avatar'
            className='article__cover--img'
          />
        </div>
        <div className='article__wrapper'>
          <div className='article__profile'>
            <span className='article__profile--name'>{post.author.name}</span>
            <Badge role={post.author.role} />
            <div className='article__profile--username'>
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
            <div className='article__actions--comments'>
              <button type='button' onClick={handleComment}>
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
                <span>{millify(post.comments.length)}</span>
              </button>
            </div>
            <div className='article__actions--likes'>
              <button
                type='button'
                onClick={handleLike}
                disabled={likeMutation.isPending}
              >
                <LikeIcon liked={isLiked} />
                <span>{millify(post.likeCount)}</span>
              </button>
            </div>
            <div className='article__actions--dislikes'>
              <button
                type='button'
                onClick={handleDislike}
                disabled={disLikeMutation.isPending}
              >
                <DislikeIcon disliked={isDisliked} />
                <span>{millify(post.dislikeCount)}</span>
              </button>
            </div>
            <div className='article__actions--saved-post'>
              <button
                type='button'
                onClick={handleSave}
                disabled={saveMutation.isPending}
              >
                <SaveIcon
                  isLoading={saveMutation.isPending}
                  hasSaved={isSaved}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
