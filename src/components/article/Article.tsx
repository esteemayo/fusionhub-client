import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Image from '../Image';
import UserAvatar from '../UserAvatar';

import Tooltip from '../tooltip/Tooltip';
import Badge from '../badge/Badge';
import AtSymbolIcon from '../icons/AtSymbolIcon';

import ArticleAction from '../articleAction/ArticleAction';
import ArticleMenus from '../articleMenus/ArticleMenus';
import ArticleCommentForm from '../articleCommentForm/ArticleCommentForm';

import { useComment } from '../../hooks/useComment';
import { useDate } from '../../hooks/useDate';
import { useWebShare } from '../../hooks/useWebShare';

import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as postModal from '../../features/postModal/postModalSlice';
import * as deleteModal from '../../features/deleteModal/deleteModalSlice';

import { excerpts, stripHtml } from '../../utils';
import { ArticleProps } from '../../types';
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
  refetch,
}: ArticleProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { blockedUsers } = useBlockedUsers();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const postUrl = `${window.location.origin}/post/${post?.slug}`;

  const postId = useMemo(() => {
    return post?._id;
  }, [post?._id]);

  const parsedText = useMemo(() => {
    return parse(String(post?.desc)).toString();
  }, [post?.desc]);

  const text = excerpts(stripHtml(parsedText), 80);

  const { commentMutation } = useComment(postId);
  const { isSaved, saveMutation, handleSave } = useSavedPosts(postId);

  const { formattedDate } = useDate(post.createdAt);
  const { error, handleShare } = useWebShare(post?.title, text, postUrl);

  const likeMutation = useMutation({
    mutationFn: () => createLikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, userId] });
    },
  });

  const disLikeMutation = useMutation({
    mutationFn: () => createDislikePost(postId),
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
        onChangeCardId(postId);
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
    if (!currentUser) return null;
    likeMutation.mutate();
  };

  const handleDislike = () => {
    if (!currentUser) return null;
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
    dispatch(deleteModal.setDeletePostId(postId));

    handleClose();
  };

  const handleClear = useCallback(() => {
    setIsShow(false);
    if (value.trim() !== '') setValue('');
  }, [value]);

  const handleCancel = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();

      if (!currentUser) return;
      handleClear();
    },
    [currentUser, handleClear]
  );

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!currentUser) return;

    commentMutation.mutate(value, {
      onSuccess: () => {
        handleClear();
        refetch();
      },
    });
  };

  const parsedDesc = useMemo(() => excerpts(parsedText, 250), [parsedText]);

  const isLiked = useMemo(
    () => !!(post.likes ?? []).some((id) => id === currentUser?.details._id),
    [post, currentUser?.details._id]
  );

  const isDisliked = useMemo(
    () => !!(post.dislikes ?? []).some((id) => id === currentUser?.details._id),
    [post, currentUser?.details._id]
  );

  const isAdmin = useMemo(
    () => currentUser?.role === 'admin',
    [currentUser?.role]
  );

  const postAuthorId = useMemo(() => post?.author._id, [post?.author._id]);

  const currentUserId = useMemo(
    () => currentUser?.details._id,
    [currentUser?.details._id]
  );

  const isPostAuthor = useMemo(
    () => postAuthorId === currentUserId,
    [postAuthorId, currentUserId]
  );

  const url = useMemo(
    () =>
      postAuthorId === currentUserId
        ? '#'
        : `/accounts/profile?username=${post.author.username}`,
    [currentUserId, post.author.username, postAuthorId]
  );

  const isBlocked = useMemo(
    () =>
      (blockedUsers ?? []).some((user) => user.id === post.author._id) || false,
    [blockedUsers, post.author._id]
  );

  const coverClasses = useMemo(
    () => (isBlocked ? 'article__cover--img blurred' : 'article__cover--img'),
    [isBlocked]
  );

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();

        if (isOpen) {
          handleClose();
        } else if (isShow) {
          handleCancel();
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [handleCancel, isOpen, isShow]);

  useEffect(() => {
    setIsOpen(activeCardId === postId);
  }, [activeCardId, postId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const isGoogleImage =
    post.author.fromGoogle && post.author.image?.startsWith('https');

  return (
    <article
      className='article'
      role='article'
      aria-labelledby={`article-title-${postId}`}
      aria-describedby={`article-desc-${postId}`}
    >
      <div className='article__container'>
        <Link
          to={url}
          className='article__cover'
          aria-label={`Visit profile of ${post.author.username}`}
        >
          <UserAvatar
            imgSrc={post.author.image}
            size={80}
            isGoogleAvatar={isGoogleImage}
            alt={`${post.author.username}’s profile picture`}
            className={coverClasses}
          />
        </Link>
        <div className='article__wrapper'>
          <div className='article__profile' role='heading' aria-level={3}>
            <Link to={url} aria-label={`Profile: ${post.author.name}`}>
              <Tooltip
                title={post.author.name}
                className='article__profile--name'
              >
                {post.author.name}
              </Tooltip>
            </Link>
            <Badge role={post.author.role} />
            <div className='article__profile--username'>
              <Link to={url} aria-label={`Username: ${post.author.username}`}>
                <AtSymbolIcon />
                <span>{post.author.username}</span>
              </Link>
            </div>
            <span className='article__profile--dot' aria-hidden='true'>
              •
            </span>
            <time
              dateTime={post.createdAt}
              className='article__profile--time'
              aria-label={`Published on ${formattedDate}`}
            >
              {formattedDate}
            </time>
          </div>
          {post.img && (
            <div className='article__image'>
              <Image
                src={post.img}
                width={300}
                height={250}
                alt={post.title}
                className='article__image--img'
              />
            </div>
          )}
          <div id={`article-desc-${postId}`} className='article__desc'>
            {parse(parsedDesc)}
            <button
              type='button'
              onClick={handleClick}
              aria-label={`Read more about: ${post.title}`}
            >
              more
            </button>
          </div>
          <div
            className='article__actions'
            role='group'
            aria-label='Post actions'
          >
            <ArticleAction
              comments={post.comments}
              likeCount={post.likeCount}
              dislikeCount={post.dislikeCount}
              savedCount={post.savedCount}
              isAdmin={isAdmin}
              isLiked={isLiked}
              isDisliked={isDisliked}
              isSaved={isSaved}
              likeMutation={likeMutation}
              disLikeMutation={disLikeMutation}
              saveMutation={saveMutation}
              onComment={handleComment}
              onLike={handleLike}
              onDislike={handleDislike}
              onSave={handleSave}
              onShare={handleShare}
            />
            <ArticleMenus
              postId={postId}
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
            isLoading={commentMutation.isPending}
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
