import { FilterType } from '../types';

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
