import { useQuery } from '@tanstack/react-query';

import EmptyPosts from '../../components/emptyPosts/EmptyPosts';
import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { PostType } from '../../types';
import { getDislikedPosts } from '../../services/postService';

import './DislikedPosts.scss';

const fetchDislikedPosts = async () => {
  const { data } = await getDislikedPosts();
  return data;
};

const DislikedPosts = () => {
  const { isPending, error, data } = useQuery<PostType[]>({
    queryKey: ['dislikedPosts'],
    queryFn: () => fetchDislikedPosts(),
  });

  const emptyPosts = (data ?? []).length < 1;

  return (
    <div className='disliked-posts'>
      <div className='disliked-posts__container'>
        <AccountHeading
          title='Least favorite posts'
          subtitle='My least liked stories/articles'
          type='profile'
        />
      </div>
      <div className='disliked-posts__wrapper'>
        {emptyPosts && !isPending ? (
          <EmptyPosts
            title='No disliked posts found'
            subtitle="You haven't disliked any posts yet. Explore content and mark posts you don't prefer to see them here."
          />
        ) : (
          <PostList isLoading={isPending} error={error} posts={data} />
        )}
      </div>
    </div>
  );
};

export default DislikedPosts;
