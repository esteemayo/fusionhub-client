import { useQuery } from '@tanstack/react-query';

import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { getDislikedPosts } from '../../services/postService';

import './DislikedPosts.scss';

const fetchDislikedPosts = async () => {
  const { data } = await getDislikedPosts();
  return data;
};

const DislikedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['dislikedPosts'],
    queryFn: () => fetchDislikedPosts(),
  });

  return (
    <div className='disliked-posts'>
      <div className='disliked-posts__container'>
        <AccountHeading
          title='Least favorite posts'
          subtitle='My least liked stories/articles'
          type='profile'
        />
      </div>
      {data?.length < 1 ? (
        <span>There are no posts to display now...</span>
      ) : (
        <div className='disliked-posts__wrapper'>
          <PostList isLoading={isPending} error={error} posts={data} />
        </div>
      )}
    </div>
  );
};

export default DislikedPosts;
