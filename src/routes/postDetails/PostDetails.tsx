import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import HeroSkeleton from '../../components/heroSkeleton/HeroSkeleton';
import Hero from '../../components/hero/Hero';
import RelatedPosts from '../../components/relatedPosts/RelatedPosts';
import ErrorState from '../../components/errorState/ErrorState';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostContent from '../../components/postContent/PostContent';
import PostMenuActions from '../../components/postMenuActions/PostMenuActions';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPostBySlug } from '../../services/postService';
import { onToggle } from '../../features/postMenuActions/postMenuActionsSlice';

import './PostDetails.scss';

const fetchPost = async (slug: string) => {
  const { data } = await getPostBySlug(slug);
  return data;
};

const PostDetails = () => {
  const { pathname } = useLocation();
  const slug = pathname.split('/').pop() as string;

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postMenuActions }));

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  if (!data && !isPending) {
    return (
      <div className='post-details'>
        <div className='post-details__container'>
          <ErrorState
            title='Post not found'
            subtitle='The post you are looking for does not exist or may have been removed.'
            imgSrc='/empty.svg'
            alt='not-found'
            center
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='post-details'>
        <div className='post-details__container'>
          <ErrorState
            title='Something went wrong!'
            subtitle={error.message}
            imgSrc='/book-writer.svg'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='post-details'>
      {isPending ? (
        <HeroSkeleton />
      ) : (
        <Hero
          title={data?.title}
          img={data?.img}
          slug={data?.slug}
          author={data?.author}
          createdAt={data?.createdAt}
        />
      )}
      <div className='post-details__container'>
        <PostContent isLoading={isPending} post={data} />
        <PostMenuActions isOpen={isOpen} post={data} />
        <div className='post-details__container--btn'>
          <ToggleButton label='Filter' isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
      <div className='post-details__wrapper'>
        <RelatedPosts postId={data?._id} tags={data?.tags} />
      </div>
    </div>
  );
};

export default PostDetails;
