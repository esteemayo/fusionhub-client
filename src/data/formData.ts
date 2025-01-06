import { CategoryOptionType, FilterType } from '../types';

export const filters: FilterType = [
  {
    id: 'newest',
    name: 'sort',
    value: 'newest',
    label: 'Newest',
  },
  {
    id: 'popular',
    name: 'sort',
    value: 'popular',
    label: 'Most popular',
  },
  {
    id: 'trending',
    name: 'sort',
    value: 'trending',
    label: 'Trending',
  },
  {
    id: 'oldest',
    name: 'sort',
    value: 'oldest',
    label: 'Oldest',
  },
];

export const categoryOptions: CategoryOptionType = [
  {
    id: '1',
    name: 'Travel',
  },
  {
    id: '2',
    name: 'Lifestyle',
  },
  {
    id: '3',
    name: 'Creativity',
  },
  {
    id: '4',
    name: 'Adventures',
  },
  {
    id: '5',
    name: 'Technology',
  },
];
