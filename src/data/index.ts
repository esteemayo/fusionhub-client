import { MenuItemType } from '../types';

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

export const comments = [
  {
    id: '1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus soluta architecto aspernatur repudiandae provident odio voluptatibus quia! Beatae aspernatur alias repellat dicta, eum voluptas commodi voluptate reiciendis reprehenderit laboriosam.',
    user: {
      name: 'Rosalina Pong',
      img: '/user-1.jpg',
    },
    createdAt: '2024-12-16T17:23:56.085+00:00',
    updatedAt: '2024-12-16T17:23:56.085+00:00',
  },
  {
    id: '2',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus ut fugit inventore nulla possimus debitis provident officia nihil velit, esse iste repudiandae dicta ad incidunt dolores sequi delectus distinctio consequatur?',
    user: {
      name: 'Christian Vega',
      img: 'user-2.jpg',
    },
    createdAt: '2024-12-16T17:23:56.085+00:00',
    updatedAt: '2024-12-16T17:23:56.085+00:00',
  },
  {
    id: '3',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, molestias quam odio ratione recusandae, temporibus veritatis necessitatibus eligendi libero ea similique beatae eaque, officiis enim est aspernatur consequuntur voluptatem quo.',
    user: {
      name: 'Lourdes Browning',
      img: 'user-3.jpg',
    },
    createdAt: '2024-12-16T17:23:56.085+00:00',
    updatedAt: '2024-12-16T17:23:56.085+00:00',
  },
];
