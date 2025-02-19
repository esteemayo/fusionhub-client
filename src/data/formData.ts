import {
  CategoryOptionType,
  FilterType,
  LoginInputType,
  RegisterInputType,
} from '../types';

export const loginInputs: LoginInputType = [
  {
    id: 'identifier',
    name: 'identifier',
    label: 'Email/Username',
    placeholder: 'Email or Username',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
  },
];

export const registerInputs: RegisterInputType = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Name',
  },
  {
    id: 'username',
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Email Address',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
  },
  {
    id: 'passwordConfirm',
    name: 'passwordConfirm',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
  },
];

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
