import { FaFacebookF } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { FaGooglePlusG } from 'react-icons/fa6';
import { BiLogoTiktok } from 'react-icons/bi';

import {
  aboutItemType,
  AccountMenuType,
  CategoryItemsType,
  CommentsType,
  CommentUserType,
  ContactInfoItemType,
  FeedItemTypes,
  FooterMenuType,
  MenuItemType,
  PartnerItemType,
  PostDetailType,
  PostItemType,
  ProfileMenuItems,
  RelatedPostType,
  RelatedTagType,
  SocialMenuType,
  TagItemType,
  TeamType,
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

export const footerMenuItems: FooterMenuType = [
  {
    id: 1,
    url: '/',
    label: 'Terms and Conditions',
  },
  {
    id: 2,
    url: '/',
    label: 'Privacy Policy',
  },
  {
    id: 3,
    url: '/',
    label: 'Cookie Preferences',
  },
  {
    id: 4,
    url: '/',
    label: 'License Agreement',
  },
  {
    id: 5,
    url: '/',
    label: 'Website Terms',
  },
  {
    id: 6,
    url: '/',
    label: 'Privacy Portal',
  },
  {
    id: 7,
    url: '/',
    label: 'Help',
  },
];

export const socialMenuItems: SocialMenuType = [
  {
    id: 1,
    url: '/',
    icon: FaFacebookF,
  },
  {
    id: 2,
    url: '/',
    icon: BiLogoTiktok,
  },
  {
    id: 3,
    url: '/',
    icon: FaThreads,
  },
  {
    id: 4,
    url: '/',
    icon: FaXTwitter,
  },
  {
    id: 5,
    url: '/',
    icon: FaInstagram,
  },
  {
    id: 6,
    url: '/',
    icon: FaYoutube,
  },
];

export const randomPostItems: PostItemType = [
  {
    id: '1',
    img: 'https://ik.imagekit.io/devayo/post-9.webp',
    title: 'Best Surfing Spots for Beginners and Advanced',
    slug: 'best-surfing-spots-for-beginners-and-advanced',
    desc: 'Dolorem explicabo delectus officiis qui vel quibusdam veritatis, nostrum laudantium, obcaecati reiciendis esse veniam numquam magnam optio. Sit aperiam animi quos voluptas?',
    category: 'travel',
    isFeatured: false,
    createdAt: '2025-03-06T16:10:18.085+00:00',
  },
  {
    id: '2',
    img: 'https://ik.imagekit.io/devayo/post-10.webp',
    title: 'High-Tech Prototype Bike Announced',
    slug: 'high-tech-prototype-bike-announced',
    desc: 'Dolorem incidunt vel sint eius. Corrupti eos fugit et necessitatibus beatae nobis fugiat? Distinctio harum vitae, consectetur dolor accusamus veniam doloribus...',
    category: 'sport',
    isFeatured: false,
    createdAt: '2025-03-06T16:10:18.085+00:00',
  },
];

export const postItems: PostItemType = [
  {
    id: '1',
    img: '/post-1.jpg',
    title: 'The Ultimate Guide to SEO Optimization',
    slug: 'the-ultimate-guide-to-seo-optimization',
    desc: 'Dolorem explicabo delectus officiis qui vel quibusdam veritatis, nostrum laudantium, obcaecati reiciendis esse veniam numquam magnam optio. Sit aperiam animi quos voluptas?',
    category: 'technology',
    isFeatured: false,
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '2',
    img: '/post-2.jpeg',
    title: 'How to Create a Social Media Marketing Strategy',
    slug: 'how-to-create-a-social-media-marketing-strategy',
    desc: 'Dolorem incidunt vel sint eius. Corrupti eos fugit et necessitatibus beatae nobis fugiat? Distinctio harum vitae, consectetur dolor accusamus veniam doloribus...',
    category: 'technology',
    isFeatured: false,
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-3.jpeg',
    title: 'How to Write a Bestselling Novel',
    slug: 'how-to-Write-a-bestselling-novel',
    desc: 'Eius cupiditate culpa nesciunt dignissimos beatae tempora consequatur deserunt at iste provident alias voluptatum itaque in nemo nisi ipsum, repellendus dolorum magnam!',
    category: 'branding',
    isFeatured: false,
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'How Can You Improve Your Public Speaking Skills',
    slug: 'how-can-you-improve-your-public-speaking-skills',
    desc: 'Nihil molestias quas ducimus libero! Dolorum quis sequi assumenda qui autem commodi debitis dicta, esse in vel repudiandae, odit delectus corporis excepturi...',
    category: 'lifestyle',
    isFeatured: true,
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '5',
    img: '/post-5.jpeg',
    title: 'Can You Learn to Code in Just a Few Weeks',
    slug: 'can-you-learn-to-code-in-just-a-few-weeks',
    desc: 'Doloremque animi dolores aut cupiditate sit sequi et veritatis, repellat inventore, nesciunt modi rerum ab deserunt maxime enim odit tempora officiis recusandae!!!',
    category: 'technology',
    isFeatured: false,
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '6',
    img: '/post-6.jpeg',
    title: '10 Ways to Boost Your Productivity',
    slug: '10-ways-to-boost-your-productivity',
    desc: 'Corrupti, id minus odio cumque voluptas dicta, reiciendis ab laudantium exercitationem, minima cum ea. Quo aliquam placeat quibusdam tempore, minima labore cum.',
    category: 'lifestyle',
    isFeatured: true,
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '7',
    img: '/post-7.jpeg',
    title: '5 Tips to Improve Your Writing Skills',
    slug: '5-tips-to-improve-your-writing-skills',
    desc: 'Dignissimos quo voluptatem recusandae repudiandae minima consectetur itaque fugit deserunt officia temporibus? Esse, aperiam sapiente reprehenderit libero dignissimos qui vel eum doloremque...',
    category: 'branding',
    isFeatured: false,
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '8',
    img: '/post-8.jpeg',
    title: '20 Best Books to Read This Summer',
    slug: '20-best-books-to-read-this-summer',
    desc: 'Cum omnis provident molestias dolor quasi impedit nisi id ipsa dolore explicabo minus esse facilis laboriosam sint ab repudiandae expedita, saepe accusantium.',
    category: 'travel',
    isFeatured: true,
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '9',
    img: '/post-9.webp',
    title: '7 Habits of Highly Successful People',
    slug: '7-habits-of-hightly-successful-people',
    desc: 'Exercitationem repellat voluptates reprehenderit illo expedita esse quia voluptatum voluptate dolore, perferendis, amet eveniet quo nemo soluta laudantium. Illo eveniet iure debitis!',
    category: 'lifestyle',
    isFeatured: false,
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '10',
    img: '/post-10.webp',
    title: '15 Ways to Reduce Stress and Anxiety',
    slug: '15-ways-to-reduce-stress-and-anxiety',
    desc: 'Officiis quia aut nostrum assumenda laboriosam reprehenderit exercitationem obcaecati dolor, aperiam deleniti laborum consequuntur, voluptatum eos earum maxime nulla nesciunt ab incidunt.',
    category: 'music',
    isFeatured: true,
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '11',
    img: '/post-11.jpeg',
    title: 'How to Start a Blog and Make Money Online',
    slug: 'how-to-start-a-blog-and-make-money-online',
    desc: 'Numquam recusandae ullam explicabo fugiat vitae ea sed quas, consequatur, ad necessitatibus amet doloremque ratione omnis ipsa! Nisi, optio! Rem, odio eveniet!',
    category: 'lifestyle',
    isFeatured: false,
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '12',
    img: '/post-12.jpeg',
    title: 'What is the Future of Artificial Intelligence',
    slug: 'what-is-the-future-of-artificial-intelligence',
    desc: 'Quo error odit quasi optio quia, sit aliquid voluptas asperiores provident cupiditate doloribus dolorum ipsum libero cumque enim praesentium quaerat, perspiciatis temporibus.',
    category: 'technology',
    isFeatured: true,
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
];

export const postDetail: PostDetailType = {
  id: '1',
  title:
    'Effective Communication Is At The Heart of Every Successful Professional.',
  slug: 'effective-communication-is-at-the-heart-of-every-successful-professional.',
  desc: `
    &lt;p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ex modi
      soluta. Minus omnis vero voluptatibus non nam quidem a, cumque
      explicabo, sint nesciunt, laudantium fugiat expedita sapiente sed
      nostrum. Fugiat, incidunt ullam. Reprehenderit, aut possimus
      cupiditate incidunt quas enim asperiores. Doloribus ipsa voluptatum
      veniam voluptas natus incidunt consequatur blanditiis nisi facilis
      distinctio quos, facere eum dignissimos fuga animi magnam! Corrupti
      ducimus iure atque beatae! Architecto, quaerat consectetur obcaecati
      tempore qui dicta adipisci nostrum reprehenderit ab ullam perferendis
      blanditiis, esse debitis eos. Quibusdam commodi quidem cumque qui sunt
      expedita incidunt. Provident assumenda necessitatibus in excepturi
      cum, ab unde. Sed, doloribus sapiente ab eos blanditiis reiciendis
      aperiam praesentium a obcaecati reprehenderit, eum dignissimos id
      magni veritatis quis ea nam asperiores distinctio. Animi, tempora?
      Sapiente a fugiat at consequatur vero cumque repudiandae, eaque libero
      quis ratione neque? Optio eum ipsa voluptate, maxime recusandae omnis,
      nobis, voluptates debitis fugiat rerum veritatis? Iusto, ab.
    &lt;/p>
    &lt;br>
    &lt;p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
      maiores corrupti cum, ad in repellendus provident veritatis tempore?
      Numquam nulla molestiae inventore quisquam cum veniam natus repellat
      odit in ipsum. Saepe porro ducimus sapiente laborum recusandae
      mollitia obcaecati cumque qui consectetur vero similique ipsum, fuga
      debitis. Corrupti, ratione placeat, tempora ullam et qui facilis,
      facere corporis quo asperiores repellat provident. Doloribus, mollitia
      nemo ipsa laboriosam doloremque voluptas necessitatibus quidem
      consequuntur dolorum cupiditate fugiat autem recusandae ab iure ipsam
      id eius. Doloribus debitis corporis eveniet error possimus libero ab
      magni molestiae?
    &lt;/p>
    &lt;br>
    &lt;p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
      incidunt, saepe nihil esse deserunt inventore, sed sint alias error,
      quis tempora! Fuga quas repellat maxime animi exercitationem eum,
      beatae quae. Maxime ex esse sequi soluta alias saepe nostrum, minima
      exercitationem labore sed odit eaque laboriosam velit eligendi optio
      commodi impedit est ipsa culpa nobis recusandae id iste architecto?
      Nemo, error. Nemo quasi, deserunt minus ut inventore quia molestiae
      ipsam reiciendis accusantium soluta tenetur nihil similique illum
      laudantium totam sit minima corrupti iusto aliquid tempore, numquam
      ipsa necessitatibus. Ipsum, voluptatem asperiores. Praesentium
      obcaecati cum beatae explicabo perspiciatis doloremque nisi veritatis
      voluptatum numquam aperiam facere culpa, assumenda fugit dicta
      voluptatem unde, earum pariatur eum, tempore odit reprehenderit
      commodi. Expedita illum mollitia eos. Vero placeat ex, ducimus
      deleniti, qui nihil quos distinctio cupiditate ipsa doloremque esse
      quis similique perferendis obcaecati dignissimos eum temporibus cumque
      voluptate. Illo animi dolore tempore eligendi corporis maxime
      doloribus! Nisi impedit tempora, soluta facere quisquam at incidunt,
      pariatur quos laudantium deserunt totam repellat a quod ad inventore
      dolorum possimus. Ullam obcaecati ea perferendis corporis minima
      veritatis eligendi nemo nulla? Debitis earum cupiditate possimus,
      accusantium, laboriosam deserunt voluptas ipsum accusamus assumenda
      laudantium quia dolores ullam ad, animi laborum quidem aut
      necessitatibus quam obcaecati! Ullam odio hic iste facere ex
      doloribus!
    &lt;/p>
  `,
  category: 'technlogy',
  tags: ['tech'],
  isFeatured: false,
  author: {
    id: '1',
    name: 'John Doe',
    username: 'jdoe',
    img: '/user/user-4.webp',
  },
  likes: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  dislikes: [],
  likeCount: 10,
  dislikeCount: 0,
  comments: [
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
  ],
  views: 10000,
  createdAt: '2024-10-16T01:50:04.085+00:00',
  updatedAt: '2024-10-16T01:50:04.085+00:00',
};

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

export const comments: CommentsType = [
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

export const categoryItems: CategoryItemsType = [
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
    img: '/post-12.jpeg',
    title: 'My Journey to Becoming a Successful Entrepreneur',
    slug: 'my-journey-to-becoming-a-successful-entrepreneur',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '2',
    img: '/post-11.jpeg',
    title: 'How I Overcame My Fear of Public Speaking',
    slug: 'how-i-overcame-my-fear-of-public-speaking',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '3',
    img: '/post-10.webp',
    title: 'The 10 Most Ridiculous Excuses for Not Exercising',
    slug: 'the-10-most-ridiculous-excuses-for-not-exercising',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '4',
    img: '/post-9.webp',
    title: 'My Experience with Online Dating and What I Learned',
    slug: 'my-experience-with-online-dating-and-what-i-learned',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '5',
    img: '/post-8.jpeg',
    title: 'What Are the Benefits of Meditation and Mindfulness?',
    slug: 'what-are-the-benefits-of-meditation-and-mindfulness?',
    createdAt: '2024-12-19T19:34:43.085+00:00',
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
    img: '/post-7.jpeg',
    title: '5 Tips to Improve Your Writing Skills',
    slug: '5-tips-to-improve-your-writing-skills',
    category: 'photo',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '2',
    img: '/post-3.jpeg',
    title: 'How to Write a Bestselling Novel',
    slug: 'how-to-Write-a-bestselling-novel',
    category: 'nature',
    createdAt: '2024-12-17T16:03:59.085+00:00',
  },
  {
    id: '3',
    img: '/post-8.jpeg',
    title: '20 Best Books to Read This Summer',
    slug: '20-best-books-to-read-this-summer',
    category: 'adventures',
    createdAt: '2024-12-19T19:34:43.085+00:00',
  },
  {
    id: '4',
    img: '/post-4.webp',
    title: 'How Can You Improve Your Public Speaking Skills',
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
    title: 'My Journey to Becoming a Successful Entrepreneur',
    slug: 'my-journey-to-becoming-a-successful-entrepreneur',
    category: ['Food', 'Travel'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '2',
    title: 'How I Overcame My Fear of Public Speaking',
    slug: 'how-i-overcame-my-fear-of-public-speaking',
    category: ['Creativity', 'Humor'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '3',
    title: 'The 10 Most Ridiculous Excuses for Not Exercising',
    slug: 'the-10-most-ridiculous-excuses-for-not-exercising',
    category: ['Art', 'Adventures'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '4',
    title: 'My Experience with Online Dating and What I Learned',
    slug: 'my-experience-with-online-dating-and-what-i-learned',
    category: ['Culture', 'Music'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
  {
    id: '5',
    title: 'What Are the Benefits of Meditation and Mindfulness?',
    slug: 'what-are-the-benefits-of-meditation-and-mindfulness?',
    category: ['Nature', 'Photo'],
    createdAt: '2024-12-18T18:01:25.085+00:00',
  },
];

export const accountMenus: AccountMenuType = [
  {
    id: 'profile',
    url: 'profile',
    icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
    label: 'Profile',
  },
  {
    id: 'articles',
    url: 'my-posts',
    icon: 'M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3',
    label: 'Articles',
  },
  {
    id: 'saved-posts',
    url: 'saved-posts',
    icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z',
    label: 'Saved posts',
  },
  {
    id: 'likes',
    url: 'liked-posts',
    icon: 'M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z',
    label: 'Likes',
  },
  {
    id: 'dislikes',
    url: 'disliked-posts',
    icon: 'M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54',
    label: 'Dislikes',
  },
  {
    id: 'profile-settings',
    url: 'profile-settings',
    icon: 'M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25',
    label: 'Profile settings',
  },
  {
    id: 'password-settings',
    url: 'password-settings',
    icon: 'M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z',
    label: 'Password settings',
  },
  {
    id: 'privacy',
    url: 'privacy',
    icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
    label: 'Privacy',
  },
  {
    id: 'categories',
    url: 'categories',
    icon: 'M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    label: 'Categories',
  },
];

export const commentUsers: CommentUserType = [
  {
    id: '1',
    img: '/user-1.jpeg',
  },
  {
    id: '2',
    img: '/user-2.jpeg',
  },
  {
    id: '3',
    img: '/user-3.jpeg',
  },
  {
    id: '4',
    img: '/user-4.webp',
  },
  {
    id: '5',
    img: '/user-5.webp',
  },
];

export const contactInfoItems: ContactInfoItemType = [
  {
    id: 1,
    icon: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
    phone: '+12133734253',
    text: 'Feel free to reach out to us via phone for any inquiries or support. Our team is available to assist you with any questions you may have. We look forward to hearing from you.',
  },
  {
    id: 2,
    icon: 'M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z',
    email: 'contact@fusionhub.com',
    text: 'You can contact us via email for any inquiries or support. Our team is ready to assist you with any questions or concerns you may have. We strive to respond to all emails promptly.',
  },
  {
    id: 3,
    icon: `
        M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z
        M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z
    `,
    location: 'New York, USA',
    text: 'Visit us at our office in New York, USA. Our team is available to meet with you in person to discuss any inquiries or support you may need. We look forward to welcoming you.',
  },
];

export const aboutItems: aboutItemType = [
  {
    id: 1,
    title: 'Strategy',
    subtitle:
      'Our strategy is to provide high-quality content that engages and informs our readers. We focus on delivering value through well-researched articles, insightful commentary, and practical advice. Our goal is to build a loyal audience by consistently meeting their needs and exceeding their expectations.',
  },
  {
    id: 2,
    title: 'Design',
    subtitle:
      'Our design philosophy centers around user experience and visual appeal. We aim to create a clean, intuitive, and aesthetically pleasing interface that enhances readability and navigation. By prioritizing simplicity and elegance, we ensure that our readers can easily access and enjoy our content.',
  },
  {
    id: 3,
    title: 'Branding',
    subtitle:
      'Our branding efforts are focused on creating a strong, recognizable identity that resonates with our audience. We strive to maintain consistency in our visual elements, tone of voice, and messaging across all platforms. By building a cohesive brand, we aim to establish trust and credibility with our readers.',
  },
  {
    id: 4,
    title: 'Development',
    subtitle:
      'Our development team is dedicated to building a robust and scalable platform that supports our content strategy and design philosophy. We use the latest technologies and best practices to ensure our site is fast, secure, and reliable. Our goal is to provide a seamless experience for our readers, whether they are accessing our content on a desktop, tablet, or mobile device.',
  },
];

export const teamItems: TeamType = [
  {
    id: 1,
    img: '/img/team-1.png',
    name: 'Tim kamerer',
    role: 'Technical director',
    socials: [FaGooglePlusG, FaInstagram, FaLinkedinIn],
  },
  {
    id: 2,
    img: '/img/team-2.png',
    name: 'Lindsay perlen',
    role: 'Senior producer',
    socials: [FaFacebookF, FaXTwitter, FaYoutube],
  },
  {
    id: 3,
    img: '/img/team-3.png',
    name: 'John brown',
    role: 'Software developer',
    socials: [FaGithub, FaXTwitter, FaTiktok],
  },
];

export const partnerItems: PartnerItemType = [
  {
    id: 1,
    imgSrc: '/86-ideas.png',
    alt: '86 Ideas Logo',
  },
  {
    id: 2,
    imgSrc: '/viatris.png',
    alt: 'Viatris Logo',
  },
  {
    id: 3,
    imgSrc: '/gamelove.png',
    alt: 'Game Love Logo',
  },
  {
    id: 4,
    imgSrc: '/apple.png',
    alt: 'Apple Logo',
  },
  {
    id: 5,
    imgSrc: '/gen3.png',
    alt: 'Gen3 Logo',
  },
  {
    id: 6,
    imgSrc: '/golfstar.png',
    alt: 'GolfStar Logo',
  },
  {
    id: 7,
    imgSrc: '/guardian.png',
    alt: 'Guardian Logo',
  },
  {
    id: 8,
    imgSrc: '/paypal.png',
    alt: 'Paypal Logo',
  },
  {
    id: 9,
    imgSrc: '/linkedin.png',
    alt: 'Linkedin Logo',
  },
  {
    id: 10,
    imgSrc: '/jellyfish.png',
    alt: 'Jelly Fish Logo',
  },
  {
    id: 11,
    imgSrc: '/tp.png',
    alt: 'Tp Logo',
  },
  {
    id: 12,
    imgSrc: '/stripe.png',
    alt: 'Stripe Logo',
  },
  {
    id: 13,
    imgSrc: '/dragon.png',
    alt: 'Dragon Logo',
  },
  {
    id: 14,
    imgSrc: '/sakwa.png',
    alt: 'Sakwa Logo',
  },
];

export const profileMenus: ProfileMenuItems = [
  {
    id: 'articles',
    label: 'Articles',
  },
  {
    id: 'comments',
    label: 'Comments',
  },
  {
    id: 'likes',
    label: 'Likes',
  },
  {
    id: 'replies',
    label: 'Replies',
  },
  {
    id: 'dislikes',
    label: 'Dislikes',
  },
];
