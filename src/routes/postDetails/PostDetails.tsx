import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import RelatedPosts from '../../components/relatedPosts/RelatedPosts';
import Hero from '../../components/hero/Hero';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostContent from '../../components/postContent/PostContent';
import PostMenuActions from '../../components/postMenuActions/PostMenuActions';
import HeroSkeleton from '../../components/heroSkeleton/HeroSkeleton';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postMenuActions/postMenuActionsSlice';

import { getPost } from '../../services/postService';

import './PostDetails.scss';

const fetchPost = async (slug: string) => {
  const { data } = await getPost(slug);
  return data;
};

const PostDetails = () => {
  const { pathname } = useLocation();
  const slug = pathname.split('/').pop();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postMenuActions }));

  const { isPending, error, data } = useQuery({
    queryKey: [`post-${slug}`],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
  });

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  if (!data) {
    return (
      <div className='post-details'>
        <div className='post-details__container'>
          <h2>Post not found!</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='post-details'>
        <div className='post-details__container'>
          <h2>Something went wrong!</h2>
          <span>{error.message}</span>
        </div>
      </div>
    );
  }
  // console.log(data);
  return (
    <div className='post-details'>
      {isPending ? (
        <HeroSkeleton />
      ) : (
        <Hero title={data.title} img={data.img} slug={data.slug} />
      )}
      <div className='post-details__container'>
        <PostContent post={data} isLoading={isPending} />
        <PostMenuActions isOpen={isOpen} />
        <div className='post-details__container--btn'>
          <ToggleButton label='Filter' isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
      <div className='post-details__wrapper'>
        <RelatedPosts postId={data._id} tags={data.tags} />
      </div>
    </div>
  );
};

export default PostDetails;
