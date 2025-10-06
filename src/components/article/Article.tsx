import { Link, useNavigate } from 'react-router-dom';
import millify from 'millify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import parse from 'html-react-parser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import ShareIcon from '../ShareIcon';
import Image from '../Image';
import GoogleImage from '../GoogleImage';

import LikeIcon from '../LikeIcon';
import SaveIcon from '../SaveIcon';
import DislikeIcon from '../DislikeIcon';

import Badge from '../badge/Badge';
import Tooltip from '../tooltip/Tooltip';

import ArticleAction from '../articleAction/ArticleAction';
import ArticleCommentForm from '../articleCommentForm/ArticleCommentForm';

import { useDate } from '../../hooks/useDate';
import { useWebShare } from '../../hooks/useWebShare';

import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as postModal from '../../features/postModal/postModalSlice';
import * as deleteModal from '../../features/deleteModal/deleteModalSlice';

import { ArticleProps } from '../../types';
import { excerpts, stripHtml } from '../../utils';
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

const Article = ({
  post,
  userId,
  activeCardId,
  queryKey,
  onChangeCardId,
}: ArticleProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const postUrl = `${window.location.origin}/post/${post?.slug}`;

  const parsedText = useMemo(() => {
    return parse(String(post?.desc)).toString();
  }, [post?.desc]);

  const text = excerpts(stripHtml(parsedText), 80);

  const { error, handleShare } = useWebShare(post?.title, text, postUrl);
  const { formattedDate } = useDate(post.createdAt);
  const { isSaved, saveMutation, handleSave } = useSavedPosts(post?._id);

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

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isShow, setIsShow] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsOpen((value) => {
      if (value) {
        onChangeCardId(null);
        return false;
      } else {
        onChangeCardId(post._id);
        return true;
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/post/${post.slug}`);
  };

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsShow((value) => {
      if (value) {
        setValue('');
        return false;
      } else {
        return true;
      }
    });
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

    handleClose();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    dispatch(deleteModal.setQueryKey(queryKey));
    dispatch(deleteModal.setDeletePostId(post._id));

    handleClose();
  };

  const handleCancel = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();

      setIsShow(false);
      if (value.trim() !== '') setValue('');
    },
    [value]
  );

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    console.log(value);
  };

  const parsedDesc = useMemo(() => {
    return excerpts(parsedText, 250);
  }, [parsedText]);

  const isLiked = useMemo(() => {
    return !!(post.likes ?? []).some((id) => id === currentUser?.details._id);
  }, [post, currentUser?.details._id]);

  const isDisliked = useMemo(() => {
    return !!(post.dislikes ?? []).some(
      (id) => id === currentUser?.details._id
    );
  }, [post, currentUser?.details._id]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser?.role]);

  const postAuthorId = useMemo(() => {
    return post?.author._id;
  }, [post?.author._id]);

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) {
          handleClose();
        } else if (isShow) {
          handleCancel();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleCancel, isOpen, isShow]);

  useEffect(() => {
    setIsOpen(activeCardId === post._id);
  }, [activeCardId, post._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <article className='article'>
      <div className='article__container'>
        <Link to={url} className='article__cover'>
          {post.author.fromGoogle && post.author.image?.startsWith('https') ? (
            <GoogleImage
              src={post.author.image ?? '/user-default.jpg'}
              width={80}
              height={80}
              alt={post.author.username}
              className='comment-card__user--img'
            />
          ) : (
            <Image
              src={post.author.image ?? '/user-default.jpg'}
              width={60}
              height={60}
              alt={post.author.username}
              className='article__cover--img'
            />
          )}
        </Link>
        <div className='article__wrapper'>
          <div className='article__profile'>
            <Link to={url}>
              <Tooltip
                title={post.author.name}
                className='article__profile--name'
              >
                {post.author.name}
              </Tooltip>
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
                <button type='button' title='Comment' onClick={handleComment}>
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
                  title='Like Post'
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
                  title='Dislike Post'
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
                  title='Save Post'
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
              <div className='article__actions--share'>
                <button type='button' title='Share Post' onClick={handleShare}>
                  <ShareIcon />
                </button>
              </div>
            </div>
            <ArticleAction
              currentUser={currentUser}
              isAdmin={isAdmin}
              isOpen={isOpen}
              isPostAuthor={isPostAuthor}
              postAuthorRole={post.author.role}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </div>
          <ArticleCommentForm
            isShow={isShow}
            value={value}
            isLoading={false}
            onChange={setValue}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </article>
  );
};

export default Article;
