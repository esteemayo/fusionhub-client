import parse from 'html-react-parser';
import millify from 'millify';
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import LikeIcon from '../LikeIcon';
import Image from '../Image';
import DislikeIcon from '../DislikeIcon';
import SaveIcon from '../SaveIcon';

import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useFavorite } from '../../hooks/useFavorite';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { ArticleProps } from '../../types';
import { excerpts } from '../../utils';
import {
  onOpen,
  setPostId,
} from '../../features/replyCommentModal/replyCommentModalSlice';

import './Article.scss';

const Article = ({ post }: ArticleProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isSaved, saveMutation, handleSave } = useSavedPosts(post._id);

  const {
    isLiked,
    isDisliked,
    likeMutation,
    disLikeMutation,
    handleLike,
    handleDislike,
  } = useFavorite(post, currentUser!);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/posts/${post.slug}`);
  };

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(onOpen());
    dispatch(setPostId(post._id));
  };

  const parsedDesc = useMemo(() => {
    return parse(excerpts(String(post.desc), 250));
  }, [post.desc]);

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
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: false,
                includeSeconds: false,
              })
                .replace('about ', '')
                .replace('less than a minute', '1m')
                .replace('minutes', 'min')
                .replace('hour', 'h')
                .replace('days', 'd')
                .replace('months', 'm')}
            </time>
          </div>
          <div className='article__desc'>
            {parse(String(parsedDesc))}
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
