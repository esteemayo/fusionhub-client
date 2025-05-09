import {
  CategoryOptionType,
  FilterType,
  LoginInputType,
  RegisterInputType,
  ResetInputType,
} from '../types';

export const loginInputs: LoginInputType = [
  {
    id: 'identifier',
    name: 'identifier',
    label: 'Email/Username',
    placeholder: 'Enter your email or username',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
];

export const registerInputs: RegisterInputType = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your full name',
  },
  {
    id: 'username',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter a strong password',
  },
  {
    id: 'passwordConfirm',
    name: 'passwordConfirm',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Re-enter your password',
  },
];

export const resetInputs: ResetInputType = [
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your new password',
  },
  {
    id: 'passwordConfirm',
    name: 'passwordConfirm',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Re-enter your new password',
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
