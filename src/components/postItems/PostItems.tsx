import { useQuery } from '@tanstack/react-query';

import ErrorState from '../errorState/ErrorState';
import Card from '../card/Card';
import CardSkeleton from '../cardSkeleton/CardSkeleton';

import { PostType } from '../../types';
import { getPosts } from '../../services/postService';

import './PostItems.scss';

const fetchPosts = async () => {
  const { data } = await getPosts();
  return data;
};

const PostItems = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  const { posts } = data ? data : [];

  if (posts?.length < 1) {
    return (
      <section className='post-items'>
        <ErrorState
          title='No posts available'
          subtitle='It seems there are no posts to display at the moment. Please check back later or try refreshing the page.'
        />
      </section>
    );
  }

  return (
    <section className='post-items'>
      <div className='post-items__container'>
        {isPending ? (
          Array.from(Array(3)).map((_, index) => {
            return <CardSkeleton key={index} />;
          })
        ) : error ? (
          <ErrorState
            title='Error loading posts'
            subtitle='We encountered an issue while trying to load the posts. Please check your internet connection or try again later.'
          />
        ) : (
          posts?.map((post: PostType) => {
            return <Card key={post._id} {...post} />;
          })
        )}
      </div>
    </section>
  );
};

export default PostItems;
