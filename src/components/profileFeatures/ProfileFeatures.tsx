import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import Tabs from '../tabs/Tabs';

import ProfileArticles from '../profileArticles/ProfileArticles';
import ProfileReplies from '../profileReplies/ProfileReplies';
import ProfileComments from '../profileComments/ProfileComments';

import { getRepliesByUser } from '../../services/replyService';
import * as postAPI from '../../services/postService';
import { getCommentsByUser } from '../../services/commentService';

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
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

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
    refetch: refetchArticles,
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
    refetch: refetchLikes,
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
    refetch: refetchDislikes,
  } = useFeatureQuery('dislikes');

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

  const tabs = useMemo(
    () => ['articles', 'comments', 'likes', 'replies', 'dislikes'],
    []
  );

  const featureContent: Record<string, JSX.Element> = {
    articles: (
      <ProfileArticles
        posts={allArticles as PostType[]}
        userId={userId}
        queryKey='articles'
        title='No Articles Yet'
        subtitle="This user hasn't published any articles. Check back later or explore other profiles!"
        isLoading={isFetchingArticles}
        hasNextPage={hasNextPageArticles}
        error={articlesError}
        refetch={refetchArticles}
        fetchNextPage={fetchNextPageArticles}
      />
    ),
    comments: (
      <ProfileComments
        activeCardId={activeCardId}
        comments={allComments as CommentType[]}
        isLoading={isFetchingComments}
        hasNextPage={hasNextPageComments}
        error={commentsError}
        onChangeCardId={setActiveCardId}
        fetchNextPage={fetchNextPageComments}
      />
    ),
    likes: (
      <ProfileArticles
        posts={allLikes as PostType[]}
        userId={userId}
        queryKey='likes'
        title='No Liked Articles Yet'
        subtitle="This user hasn't liked any articles. Check back later or explore other profiles!"
        isLoading={isFetchingLikes}
        hasNextPage={hasNextPageLikes}
        error={likesError}
        refetch={refetchLikes}
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
        title='No Dislike Articles Yet'
        subtitle="This user hasn't disliked any articles. Check back later or explore other profiles!"
        isLoading={isFetchingDislikes}
        hasNextPage={hasNextPageDislikes}
        error={dislikesError}
        refetch={refetchDislikes}
        fetchNextPage={fetchNextPageDislikes}
      />
    ),
  };

  return (
    <section
      className={profileClasses}
      aria-live='polite'
      aria-label='User profile features'
    >
      <div className='profile-features__container'>
        <Tabs
          tabs={tabs}
          defaultValue='articles'
          renderContent={(tab) => featureContent[tab]}
        />
      </div>
    </section>
  );
};

export default ProfileFeatures;
