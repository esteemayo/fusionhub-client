import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import ProfileArticles from '../profileArticles/ProfileArticles';
import ProfileReplies from '../profileReplies/ProfileReplies';
import ProfileComments from '../profileComments/ProfileComments';

import { getRepliesByUser } from '../../services/replyService';
import * as postAPI from '../../services/postService';
import { getCommentsByUser } from '../../services/commentService';

import { profileMenus } from '../../data';
import { ProfileFeaturesProps } from '../../types';

import './ProfileFeatures.scss';

const fetchPostsByUser = async (userId: string, pageParam: number) => {
  const { data } = await postAPI.getPostsByUser(userId, pageParam);
  return data;
};

const fetchCommentsByUser = async (userId: string, pageParam: number) => {
  const { data } = await getCommentsByUser(userId, pageParam);
  return data;
};

const fetchPostsLikedByUser = async (userId: string, pageParam: number) => {
  const { data } = await postAPI.getPostsLikedByUser(userId, pageParam);
  return data;
};
const fetchRepliesByUser = async (userId: string, pageParam: number) => {
  const { data } = await getRepliesByUser(userId, pageParam);
  return data;
};

const fetchPostsDislikedByUser = async (userId: string, pageParam: number) => {
  const { data } = await postAPI.getPostsDislikedByUser(userId, pageParam);
  return data;
};

const ProfileFeatures = ({ query, userId }: ProfileFeaturesProps) => {
  const { isFetching, error, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ['posts', userId],
      queryFn: ({ pageParam = 1 }) => fetchPostsByUser(userId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
      enabled: !!userId,
    });

  const {
    isFetching: isFetchingComments,
    error: commentsError,
    fetchNextPage: fetchNextPageComments,
    hasNextPage: hasNextPageComments,
    data: commentsData,
  } = useInfiniteQuery({
    queryKey: ['comments', userId],
    queryFn: ({ pageParam }) => fetchCommentsByUser(userId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    enabled: !!userId,
  });

  const {
    isFetching: isFetchingLikes,
    error: likesError,
    fetchNextPage: fetchNextPageLikes,
    hasNextPage: hasNextPageLikes,
    data: likesData,
  } = useInfiniteQuery({
    queryKey: ['likes', userId],
    queryFn: ({ pageParam }) => fetchPostsLikedByUser(userId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    enabled: !!userId,
  });

  const {
    isFetching: isFetchingReplies,
    error: repliesError,
    fetchNextPage: fetchNextPageReplies,
    hasNextPage: hasNextPageReplies,
    data: repliesData,
  } = useInfiniteQuery({
    queryKey: ['replies', userId],
    queryFn: ({ pageParam }) => fetchRepliesByUser(userId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    enabled: !!userId,
  });

  const {
    isFetching: isFetchingDislikes,
    error: dislikesError,
    fetchNextPage: fetchNextPageDislikes,
    hasNextPage: hasNextPageDislikes,
    data: dislikesData,
  } = useInfiniteQuery({
    queryKey: ['dislikes', userId],
    queryFn: ({ pageParam }) => fetchPostsDislikedByUser(userId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    enabled: !!userId,
  });

  const [isSelected, setIsSelected] = useState('articles');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setIsSelected(id);
  };

  const btnClasses = (id: string) => {
    return isSelected === id
      ? 'profile-features__buttons--btn active'
      : 'profile-features__buttons--btn';
  };

  const profileClasses = useMemo(() => {
    return query ? 'profile-features show' : 'profile-features hide';
  }, [query]);

  const allArticles = useMemo(() => {
    return data?.pages.flatMap((page) => page.posts) || [];
  }, [data]);

  const allComments = useMemo(() => {
    return commentsData?.pages.flatMap((page) => page.comments) || [];
  }, [commentsData]);

  const allLikes = useMemo(() => {
    return likesData?.pages.flatMap((page) => page.posts) || [];
  }, [likesData]);

  const allReplies = useMemo(() => {
    return repliesData?.pages.flatMap((page) => page.replies) || [];
  }, [repliesData]);

  const allDislikes = useMemo(() => {
    return dislikesData?.pages.flatMap((page) => page.posts) || [];
  }, [dislikesData]);

  let bodyContent: JSX.Element | undefined;

  switch (isSelected) {
    case 'articles':
      bodyContent = (
        <ProfileArticles
          posts={allArticles}
          title='No articles yet'
          subtitle="This user hasn't published any articles. Check back later or explore other profiles!"
          isLoading={isFetching}
          hasNextPage={hasNextPage}
          error={error}
          fetchNextPage={fetchNextPage}
        />
      );
      break;

    case 'comments':
      bodyContent = (
        <ProfileComments
          comments={allComments}
          isLoading={isFetchingComments}
          hasNextPage={hasNextPageComments}
          error={commentsError}
          fetchNextPage={fetchNextPageComments}
        />
      );
      break;

    case 'likes':
      bodyContent = (
        <ProfileArticles
          posts={allLikes}
          title='No liked articles yet'
          subtitle="This user hasn't liked any articles. Check back later or explore other profiles!"
          isLoading={isFetchingLikes}
          hasNextPage={hasNextPageLikes}
          error={likesError}
          fetchNextPage={fetchNextPageLikes}
        />
      );
      break;

    case 'replies':
      bodyContent = (
        <ProfileReplies
          replies={allReplies}
          isLoading={isFetchingReplies}
          hasNextPage={hasNextPageReplies}
          error={repliesError}
          fetchNextPage={fetchNextPageReplies}
        />
      );
      break;

    case 'dislikes':
      bodyContent = (
        <ProfileArticles
          posts={allDislikes}
          title='No dislike articles yet'
          subtitle="This user hasn't disliked any articles. Check back later or explore other profiles!"
          isLoading={isFetchingDislikes}
          hasNextPage={hasNextPageDislikes}
          error={dislikesError}
          fetchNextPage={fetchNextPageDislikes}
        />
      );
      break;

    default:
      break;
  }

  return (
    <section className={profileClasses}>
      <div className='profile-features__container'>
        <div className='profile-features__wrapper'>
          <div className='profile-features__buttons'>
            {profileMenus.map((menu) => {
              const { id, label } = menu;
              return (
                <button
                  key={id}
                  type='button'
                  className={btnClasses(id)}
                  onClick={(e) => handleClick(e, id)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className='profile-features__box'>{bodyContent}</div>
      </div>
    </section>
  );
};

export default ProfileFeatures;
