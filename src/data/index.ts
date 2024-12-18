import {
  CommentType,
  FeedItemTypes,
  MenuItemType,
  RelatedPostType,
  RelatedTagType,
  TagItemType,
} from '../types';

export const menuItems: MenuItemType = [
  {
    id: 1,
    url: '/',
    label: 'Home',
  },
  {
    id: 2,
    url: '/posts',
    label: 'Posts',
  },
  {
    id: 3,
    url: '/about',
    label: 'About',
  },
  {
    id: 4,
    url: '/contact',
    label: 'Contact',
  },
];

export const relatedTags: RelatedTagType = [
  {
    id: 1,
    label: 'Travel',
  },
  {
    id: 2,
    label: 'Lifestyle',
  },
  {
    id: 3,
    label: 'Photo',
  },
  {
    id: 4,
    label: 'Adventures',
  },
  {
    id: 5,
    label: 'Musician',
  },
  {
    id: 6,
    label: 'Food',
  },
];

export const comments: CommentType = [
  {
    id: '1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus soluta architecto aspernatur repudiandae provident odio voluptatibus quia! Beatae aspernatur alias repellat dicta, eum voluptas commodi voluptate reiciendis reprehenderit laboriosam.',
    user: {
      name: 'Rosalina Pong',
      img: '/user-1.jpeg',
    },
    createdAt: '2024-12-16T17:23:56.085+00:00',
    updatedAt: '2024-12-16T17:23:56.085+00:00',
  },
  {
    id: '2',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus ut fugit inventore nulla possimus debitis provident officia nihil velit, esse iste repudiandae dicta ad incidunt dolores sequi delectus distinctio consequatur?',
    user: {
      name: 'Christian Vega',
      img: '/user-2.jpeg',
    },
    createdAt: '2024-12-16T17:23:56.085+00:00',
    updatedAt: '2024-12-16T17:23:56.085+00:00',
  },
  {
    id: '3',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, molestias quam odio ratione recusandae, temporibus veritatis necessitatibus eligendi libero ea similique beatae eaque, officiis enim est aspernatur consequuntur voluptatem quo.',
    user: {
      name: 'Lourdes Browning',
      img: '/user-3.jpeg',
    },
    createdAt: '2024-12-16T17:23:56.085+00:00',
    updatedAt: '2024-12-16T17:23:56.085+00:00',
  },
];

export const feedItems: FeedItemTypes = [
  {
    id: '1',
    img: '/post-1.jpg',
    title: 'Alonso kelina falao asiano pero',
    slug: 'alonso-kelina-falao-asiano-pero',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '2',
    img: '/post-2.jpeg',
    title: 'It is a long established fact that a reader',
    slug: 'it-is-a-long-established-fact-that-a-reader',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-3.jpeg',
    title: 'Many desktop publish packages and web',
    slug: 'many-desktop-publish-packages-and-web',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'Various versions have evolved over the years',
    slug: 'various-versions-have-evolved-over-the-years',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '5',
    img: '/post-5.jpeg',
    title: 'Photo booth anim 8-bit PBSC 3 wolf moon.',
    slug: 'photo-booth-anim-8-bit-PBSC-3-wolf-moon.',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
];

export const tagItems: TagItemType = [
  {
    id: 1,
    label: 'Travel',
  },
  {
    id: 2,
    label: 'Lifestyle',
  },
  {
    id: 3,
    label: 'Photo',
  },
  {
    id: 4,
    label: 'Adventures',
  },
  {
    id: 5,
    label: 'Musician',
  },
  {
    id: 6,
    label: 'Food',
  },
  {
    id: 7,
    label: 'Travel',
  },
  {
    id: 8,
    label: 'Lifestyle',
  },
  {
    id: 9,
    label: 'Photo',
  },
  {
    id: 10,
    label: 'Adventures',
  },
  {
    id: 11,
    label: 'Musician',
  },
  {
    id: 12,
    label: 'Food',
  },
];

export const relatedPosts: RelatedPostType = [
  {
    id: '1',
    img: '/post-1.jpg',
    title: 'Alonso kelina falao asiano pero',
    slug: 'alonso-kelina-falao-asiano-pero',
    category: 'photo',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '2',
    img: '/post-2.jpeg',
    title: 'It is a long established fact that a reader',
    slug: 'it-is-a-long-established-fact-that-a-reader',
    category: 'lifestyle',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-3.jpeg',
    title: 'Many desktop publish packages and web',
    slug: 'many-desktop-publish-packages-and-web',
    category: 'nature',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'Various versions have evolved over the years',
    slug: 'various-versions-have-evolved-over-the-years',
    category: 'adventures',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '5',
    img: '/post-5.jpeg',
    title: 'Photo booth anim 8-bit PBSC 3 wolf moon.',
    slug: 'photo-booth-anim-8-bit-PBSC-3-wolf-moon.',
    category: 'lifestyle',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
];
