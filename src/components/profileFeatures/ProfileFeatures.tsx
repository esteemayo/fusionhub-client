import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import ProfileReplies from '../profileReplies/ProfileReplies';
import ProfileArticles from '../profileArticles/ProfileArticles';
import ProfileComments from '../profileComments/ProfileComments';

import { profileMenus } from '../../data';
import { getPostsByUser } from '../../services/postService';

import './ProfileFeatures.scss';

const fetchPostsByUser = async (
  userId: string,
  pageParam: number,
  searchParams: URLSearchParams
) => {
  const { data } = await getPostsByUser(userId, pageParam, searchParams);
  return data;
};

const ProfileFeatures = ({
  query,
  userId,
}: {
  query: string | null;
  userId: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isFetching, error, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ['posts', searchParams.toString()],
      queryFn: ({ pageParam = 1 }) =>
        fetchPostsByUser(userId, pageParam, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  const allArticles = data?.pages.flatMap((page) => page.posts) || [];

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

  let bodyContent: JSX.Element | undefined;

  switch (isSelected) {
    case 'articles':
      bodyContent = (
        <ProfileArticles
          posts={allArticles}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      );
      break;

    case 'comments':
      bodyContent = <ProfileComments />;
      break;

    case 'likes':
      bodyContent = (
        <ProfileArticles
          posts={allArticles}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      );
      break;

    case 'replies':
      bodyContent = <ProfileReplies />;
      break;

    case 'dislikes':
      bodyContent = (
        <ProfileArticles
          posts={allArticles}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
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
