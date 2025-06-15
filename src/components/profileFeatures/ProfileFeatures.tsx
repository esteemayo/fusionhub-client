import { useMemo, useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import ProfileArticles from '../profileArticles/ProfileArticles';
import ProfileReplies from '../profileReplies/ProfileReplies';
import ProfileComments from '../profileComments/ProfileComments';

import { getRepliesByUser } from '../../services/replyService';
import * as postAPI from '../../services/postService';
import { getCommentsByUser } from '../../services/commentService';

import { profileMenus } from '../../data';
import {
  CommentType,
  PostType,
  ProfileFeaturesProps,
  ReplyType,
} from '../../types';

import './ProfileFeatures.scss';

const createFetcher =
  <T,>(fn: (userId: string, page: number) => Promise<{ data: T }>) =>
  (userId: string, pageParam: number) =>
    fn(userId, pageParam).then((res) => res.data);

const ProfileFeatures = ({ query, userId }: ProfileFeaturesProps) => {
  const [isSelected, setIsSelected] = useState('articles');

  type FeatureKey = 'articles' | 'comments' | 'likes' | 'replies' | 'dislikes';

  const fetchers: Record<
    FeatureKey,
    (userId: string, pageParam: number) => Promise<unknown>
  > = useMemo(
    () => ({
      articles: createFetcher(postAPI.getPostsByUser),
      comments: createFetcher(getCommentsByUser),
      likes: createFetcher(postAPI.getPostsLikedByUser),
      replies: createFetcher(getRepliesByUser),
      dislikes: createFetcher(postAPI.getPostsDislikedByUser),
    }),
    []
  );

  const useFeatureQuery = (key: FeatureKey) =>
    useInfiniteQuery({
      queryKey: [key, userId],
      queryFn: ({ pageParam = 1 }) => fetchers[key](userId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        (lastPage as { hasMore?: boolean })?.hasMore
          ? pages.length + 1
          : undefined,
      enabled: !!userId,
    });

  const {
    isFetching: isFetchingArticles,
    error: articlesError,
    fetchNextPage: fetchNextPageArticles,
    hasNextPage: hasNextPageArticles,
    data: articlesData,
  } = useFeatureQuery('articles');

  const {
    isFetching: isFetchingComments,
    error: commentsError,
    fetchNextPage: fetchNextPageComments,
    hasNextPage: hasNextPageComments,
    data: commentsData,
  } = useFeatureQuery('comments');

  const {
    isFetching: isFetchingLikes,
    error: likesError,
    fetchNextPage: fetchNextPageLikes,
    hasNextPage: hasNextPageLikes,
    data: likesData,
  } = useFeatureQuery('likes');

  const {
    isFetching: isFetchingReplies,
    error: repliesError,
    fetchNextPage: fetchNextPageReplies,
    hasNextPage: hasNextPageReplies,
    data: repliesData,
  } = useFeatureQuery('replies');

  const {
    isFetching: isFetchingDislikes,
    error: dislikesError,
    fetchNextPage: fetchNextPageDislikes,
    hasNextPage: hasNextPageDislikes,
    data: dislikesData,
  } = useFeatureQuery('dislikes');

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      e.stopPropagation();
      setIsSelected(id);
    },
    []
  );

  const btnClasses = useCallback(
    (id: string) =>
      isSelected === id
        ? 'profile-features__buttons--btn active'
        : 'profile-features__buttons--btn',
    [isSelected]
  );

  const profileClasses = useMemo(
    () => (query ? 'profile-features show' : 'profile-features hide'),
    [query]
  );

  const extract = (data: unknown, key: string) =>
    (data && typeof data === 'object' && 'pages' in data
      ? (data as { pages: Array<Record<string, unknown>> }).pages.flatMap(
          (page) => page[key]
        )
      : []) || [];

  const allArticles = useMemo(
    () => extract(articlesData, 'posts'),
    [articlesData]
  );

  const allComments = useMemo(
    () => extract(commentsData, 'comments'),
    [commentsData]
  );

  const allLikes = useMemo(() => extract(likesData, 'posts'), [likesData]);

  const allReplies = useMemo(
    () => extract(repliesData, 'replies'),
    [repliesData]
  );

  const allDislikes = useMemo(
    () => extract(dislikesData, 'posts'),
    [dislikesData]
  );

  const featureContent: Record<string, JSX.Element> = {
    articles: (
      <ProfileArticles
        posts={allArticles as PostType[]}
        userId={userId}
        queryKey='articles'
        title='No articles yet'
        subtitle="This user hasn't published any articles. Check back later or explore other profiles!"
        isLoading={isFetchingArticles}
        hasNextPage={hasNextPageArticles}
        error={articlesError}
        fetchNextPage={fetchNextPageArticles}
      />
    ),
    comments: (
      <ProfileComments
        comments={allComments as CommentType[]}
        isLoading={isFetchingComments}
        hasNextPage={hasNextPageComments}
        error={commentsError}
        fetchNextPage={fetchNextPageComments}
      />
    ),
    likes: (
      <ProfileArticles
        posts={allLikes as PostType[]}
        userId={userId}
        queryKey='likes'
        title='No liked articles yet'
        subtitle="This user hasn't liked any articles. Check back later or explore other profiles!"
        isLoading={isFetchingLikes}
        hasNextPage={hasNextPageLikes}
        error={likesError}
        fetchNextPage={fetchNextPageLikes}
      />
    ),
    replies: (
      <ProfileReplies
        replies={allReplies as ReplyType[]}
        isLoading={isFetchingReplies}
        hasNextPage={hasNextPageReplies}
        error={repliesError}
        fetchNextPage={fetchNextPageReplies}
      />
    ),
    dislikes: (
      <ProfileArticles
        posts={allDislikes as PostType[]}
        userId={userId}
        queryKey='dislikes'
        title='No dislike articles yet'
        subtitle="This user hasn't disliked any articles. Check back later or explore other profiles!"
        isLoading={isFetchingDislikes}
        hasNextPage={hasNextPageDislikes}
        error={dislikesError}
        fetchNextPage={fetchNextPageDislikes}
      />
    ),
  };

  return (
    <section className={profileClasses}>
      <div className='profile-features__container'>
        <div className='profile-features__wrapper'>
          <div className='profile-features__buttons'>
            {profileMenus.map(({ id, label }) => (
              <button
                key={id}
                type='button'
                className={btnClasses(id)}
                onClick={(e) => handleClick(e, id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className='profile-features__box'>
          {featureContent[isSelected]}
        </div>
      </div>
    </section>
  );
};

export default ProfileFeatures;
