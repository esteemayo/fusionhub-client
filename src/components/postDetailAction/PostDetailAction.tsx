import { useMemo } from 'react';

import PostViews from '../postViews/PostViews';
import Share from '../share/Share';
import PostComment from '../postComment/PostComment';
import PostInfo from '../postInfo/PostInfo';
import FavoriteButton from '../favoriteButton/FavoriteButton';

import { useFavorite } from '../../hooks/useFavorite';
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
  } = useFavorite(post, currentUser!);

  return (
    <div className='post-detail-action'>
      <div className='post-detail-action__container'>
        <div className='post-detail-action__wrapper'>
          <PostInfo
            username={post?.author.username}
            authorId={post?.author._id}
            userId={currentUser?.details._id}
            createdAt={post?.createdAt}
          />
          <PostViews views={post?.views} />
        </div>
        <div className='post-detail-action__box'>
          <div className='post-detail-action__box--actions'>
            <FavoriteButton
              likeCount={post?.likeCount}
              dislikeCount={post?.dislikeCount}
              isLiked={isLiked}
              isDisliked={isDisliked}
              likeMutation={likeMutation}
              disLikeMutation={disLikeMutation}
              onLike={handleLike}
              onDislike={handleDislike}
            />
            <PostComment comments={post?.comments} />
          </div>
          <Share
            isSaved={isSaved}
            currentUser={currentUser!}
            saveMutation={saveMutation}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetailAction;
