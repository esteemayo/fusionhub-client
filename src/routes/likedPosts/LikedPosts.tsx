import { useQuery } from '@tanstack/react-query';

import EmptyPosts from '../../components/emptyPosts/EmptyPosts';
import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { PostType } from '../../types';
import { getLikedPosts } from '../../services/postService';

import './LikedPosts.scss';

const fetchLikedPosts = async () => {
  const { data } = await getLikedPosts();
  return data;
};

const LikedPosts = () => {
  const { isPending, error, data } = useQuery<PostType[]>({
    queryKey: ['likedPosts'],
    queryFn: () => fetchLikedPosts(),
  });

  return (
    <div className='liked-posts'>
      <div className='liked-posts__container'>
        <AccountHeading
          title='Favorite posts'
          subtitle='My favorite stories/articles'
          type='profile'
        />
      </div>
      <div className='liked-posts__wrapper'>
        {(data ?? [])?.length < 1 && !isPending ? (
          <EmptyPosts
            title='No liked posts found'
            subtitle="You haven't liked any posts yet. Explore stories and articles that resonate with you, and click the like button to save them here!"
          />
        ) : (
          <PostList isLoading={isPending} error={error} posts={data} />
        )}
      </div>
    </div>
  );
};

export default LikedPosts;
