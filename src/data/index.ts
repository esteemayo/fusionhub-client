import {
  CategoryType,
  CommentType,
  FeedItemTypes,
  MenuItemType,
  PostItemType,
  RelatedPostType,
  RelatedTagType,
  TagItemType,
  TopPostType,
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

export const postItems: PostItemType = [
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
  {
    id: '6',
    img: '/post-6.jpeg',
    title: '10 Ways to boost your productivity',
    slug: '10-ways-to-boost-your-productivity',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '7',
    img: '/post-7.jpeg',
    title: '5 Tips to improve your writing skills',
    slug: '5-tips-to-improve-your-writing-skills',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '8',
    img: '/post-8.jpeg',
    title: '20 Best books to read this summer',
    slug: '20-best-books-to-read-this-summer',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '9',
    img: '/post-9.webp',
    title: '7 Habits of hightly successful people',
    slug: '7-habits-of-hightly-successful-people',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '10',
    img: '/post-10.webp',
    title: '15 Ways to reduce stress and anxiety',
    slug: '15-ways-to-reduce-stress-and-anxiety',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '11',
    img: '/post-11.jpeg',
    title: 'How to start a blog and make money online',
    slug: 'how-to-start-a-blog-and-make-money-online',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '12',
    img: '/post-12.jpeg',
    title: 'What is the future of Artificial Intelligence',
    slug: 'what-is-the-future-of-artificial-intelligence',
    createdAt: '2024-12-17T16:03:59.085+00:00',
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

export const categoryItems: CategoryType = [
  {
    id: '1',
    name: 'lifestyle',
    total: 5,
  },
  {
    id: '2',
    name: 'travel',
    total: 34,
  },
  {
    id: '3',
    name: 'fashion',
    total: 9,
  },
  {
    id: '4',
    name: 'music',
    total: 46,
  },
  {
    id: '5',
    name: 'branding',
    total: 16,
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
    label: 'Culture',
  },
  {
    id: 8,
    label: 'Creativity',
  },
  {
    id: 9,
    label: 'Humor',
  },
  {
    id: 10,
    label: 'Music',
  },
  {
    id: 11,
    label: 'Art',
  },
  {
    id: 12,
    label: 'Nature',
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
    category: 'adventures',
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
    category: 'travel',
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

export const topPosts: TopPostType = [
  {
    id: '1',
    title: 'Omnis velit exercitationem soluta nam nemo!',
    slug: 'omnis-velit-exercitationem-soluta-nam-nemo!',
    category: ['Food', 'Travel'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '2',
    title: 'Reiciendis dicta expedita numquam esse praesentium',
    slug: 'reiciendis-dicta-expedita-numquam-esse-praesentium',
    category: ['Creativity', 'Humor'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '3',
    title: 'Perferendis esse sapiente molestiae inventore.',
    slug: 'perferendis-esse-sapiente-molestiae-inventore.',
    category: ['Art', 'Adventures'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '4',
    title: 'Dolorum temporibus voluptatibus libero illo molestiae',
    slug: 'dolorum-temporibus-voluptatibus-libero-illo-molestiae',
    category: ['Culture', 'Music'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '5',
    title: 'Beatae veritatis pariatur provident omnis',
    slug: 'beatae-veritatis-pariatur-provident-omnis',
    category: ['Nature', 'Photo'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
];
