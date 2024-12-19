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
    title: 'The ultimate guide to SEO optimization',
    slug: 'the-ultimate-guide-to-seo-optimization',
    desc: 'Dolorem explicabo delectus officiis qui vel quibusdam veritatis, nostrum laudantium, obcaecati reiciendis esse veniam numquam magnam optio. Sit aperiam animi quos voluptas?',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '2',
    img: '/post-2.jpeg',
    title: 'How to create a social media marketing strategy',
    slug: 'how-to-create-a-social-media-marketing-strategy',
    desc: 'Dolorem incidunt vel sint eius. Corrupti eos fugit et necessitatibus beatae nobis fugiat? Distinctio harum vitae, consectetur dolor accusamus veniam doloribus...',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-3.jpeg',
    title: 'How to Write a Bestselling Novel',
    slug: 'how-to-Write-a-bestselling-novel',
    desc: 'Eius cupiditate culpa nesciunt dignissimos beatae tempora consequatur deserunt at iste provident alias voluptatum itaque in nemo nisi ipsum, repellendus dolorum magnam!',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'How can you improve your public speaking skills',
    slug: 'how-can-you-improve-your-public-speaking-skills',
    desc: 'Nihil molestias quas ducimus libero! Dolorum quis sequi assumenda qui autem commodi debitis dicta, esse in vel repudiandae, odit delectus corporis excepturi...',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '5',
    img: '/post-5.jpeg',
    title: 'Can You Learn to Code in Just a Few Weeks',
    slug: 'can-you-learn-to-code-in-just-a-few-weeks',
    desc: 'Doloremque animi dolores aut cupiditate sit sequi et veritatis, repellat inventore, nesciunt modi rerum ab deserunt maxime enim odit tempora officiis recusandae!!!',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '6',
    img: '/post-6.jpeg',
    title: '10 Ways to boost your productivity',
    slug: '10-ways-to-boost-your-productivity',
    desc: 'Corrupti, id minus odio cumque voluptas dicta, reiciendis ab laudantium exercitationem, minima cum ea. Quo aliquam placeat quibusdam tempore, minima labore cum.',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '7',
    img: '/post-7.jpeg',
    title: '5 Tips to improve your writing skills',
    slug: '5-tips-to-improve-your-writing-skills',
    desc: 'Dignissimos quo voluptatem recusandae repudiandae minima consectetur itaque fugit deserunt officia temporibus? Esse, aperiam sapiente reprehenderit libero dignissimos qui vel eum doloremque...',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '8',
    img: '/post-8.jpeg',
    title: '20 Best books to read this summer',
    slug: '20-best-books-to-read-this-summer',
    desc: 'Cum omnis provident molestias dolor quasi impedit nisi id ipsa dolore explicabo minus esse facilis laboriosam sint ab repudiandae expedita, saepe accusantium.',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '9',
    img: '/post-9.webp',
    title: '7 Habits of hightly successful people',
    slug: '7-habits-of-hightly-successful-people',
    desc: 'Exercitationem repellat voluptates reprehenderit illo expedita esse quia voluptatum voluptate dolore, perferendis, amet eveniet quo nemo soluta laudantium. Illo eveniet iure debitis!',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '10',
    img: '/post-10.webp',
    title: '15 Ways to reduce stress and anxiety',
    slug: '15-ways-to-reduce-stress-and-anxiety',
    desc: 'Officiis quia aut nostrum assumenda laboriosam reprehenderit exercitationem obcaecati dolor, aperiam deleniti laborum consequuntur, voluptatum eos earum maxime nulla nesciunt ab incidunt.',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '11',
    img: '/post-11.jpeg',
    title: 'How to start a blog and make money online',
    slug: 'how-to-start-a-blog-and-make-money-online',
    desc: 'Numquam recusandae ullam explicabo fugiat vitae ea sed quas, consequatur, ad necessitatibus amet doloremque ratione omnis ipsa! Nisi, optio! Rem, odio eveniet!',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '12',
    img: '/post-12.jpeg',
    title: 'What is the future of Artificial Intelligence',
    slug: 'what-is-the-future-of-artificial-intelligence',
    desc: 'Quo error odit quasi optio quia, sit aliquid voluptas asperiores provident cupiditate doloribus dolorum ipsum libero cumque enim praesentium quaerat, perspiciatis temporibus.',
    createdAt: '2024-12-19T19:34:43.085+00:00',
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
    title: 'The ultimate guide to SEO optimization',
    slug: 'the-ultimate-guide-to-seo-optimization',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '2',
    img: '/post-2.jpeg',
    title: 'How to create a social media marketing strategy',
    slug: 'how-to-create-a-social-media-marketing-strategy',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-3.jpeg',
    title: 'How to Write a Bestselling Novel',
    slug: 'how-to-Write-a-bestselling-novel',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'How can you improve your public speaking skills',
    slug: 'how-can-you-improve-your-public-speaking-skills',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '5',
    img: '/post-5.jpeg',
    title: 'Can You Learn to Code in Just a Few Weeks',
    slug: 'can-you-learn-to-code-in-just-a-few-weeks',
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
    title: 'The ultimate guide to SEO optimization',
    slug: 'the-ultimate-guide-to-seo-optimization',
    category: 'photo',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '2',
    img: '/post-2.jpeg',
    title: 'How to create a social media marketing strategy',
    slug: 'how-to-create-a-social-media-marketing-strategy',
    category: 'adventures',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-3.jpeg',
    title: 'How to Write a Bestselling Novel',
    slug: 'how-to-Write-a-bestselling-novel',
    category: 'nature',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'How can you improve your public speaking skills',
    slug: 'how-can-you-improve-your-public-speaking-skills',
    category: 'travel',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '5',
    img: '/post-5.jpeg',
    title: 'Can You Learn to Code in Just a Few Weeks',
    slug: 'can-you-learn-to-code-in-just-a-few-weeks',
    category: 'lifestyle',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
];

export const topPosts: TopPostType = [
  {
    id: '1',
    title: 'My journey to becoming a successful entrepreneur',
    slug: 'my-journey-to-becoming-a-successful-entrepreneur',
    category: ['Food', 'Travel'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '2',
    title: 'How i overcame the fear of public speaking',
    slug: 'how-i-overcame-the-fear-of-public-speaking',
    category: ['Creativity', 'Humor'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '3',
    title: 'The 10 most ridiculous excuses for not exercising',
    slug: 'the-10-most-ridiculous-excuses-for-not-exercising',
    category: ['Art', 'Adventures'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '4',
    title: 'My experience with online dating and what i learned',
    slug: 'my-experience-with-online-dating-and-what-i-learned',
    category: ['Culture', 'Music'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '5',
    title: 'What are the benefits of meditation and mindfulness?',
    slug: 'what-are-the-benefits-of-meditation-and-mindfulness?',
    category: ['Nature', 'Photo'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
];
