import React from 'react';

export interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

export interface EmptyStateProps {
  url?: string;
  title: string;
  subtitle: string;
  center?: boolean;
  imgSrc?: string;
  alt?: string;
  label?: string;
  formatImg?: boolean;
  showReset?: boolean;
  showReload?: boolean;
}

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'month'
  | 'week'
  | 'url'
  | 'search'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden'
  | 'image'
  | 'reset'
  | 'submit';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  type?: InputType;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

type ButtonType = 'button' | 'reset' | 'submit';

export interface ButtonProps {
  label: string;
  img?: string;
  type?: ButtonType;
  className: 'primary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export interface CommentCardProps {
  id: string;
  desc: string;
  user: {
    name: string;
    img: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeedProps {
  id: string;
  img: string;
  title: string;
  slug: string;
  createdAt: string;
}

export interface RelatedPostProps {
  id: string;
  img: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

export interface TopPostProps {
  id: string;
  title: string;
  slug: string;
  category: string[];
  createdAt: string;
  index: number;
}

export interface AuthLinkProps {
  url: string;
  label: string;
  urlLabel: string;
}

export interface FilterItemProps {
  id: string;
  name: string;
  value: string;
  label: string;
}

export interface CategoryItemProps {
  id: string;
  name: string;
  total: number;
}

export interface CardProps {
  id: string;
  img: string;
  title: string;
  slug: string;
  desc: string;
  createdAt: string;
}

export type MenuItemType = {
  id: number;
  url: string;
  label: string;
}[];

type TagType = {
  id: number;
  label: string;
};

export type PostItemType = {
  id: string;
  img: string;
  title: string;
  slug: string;
  desc: string;
  createdAt: string;
}[];

export type RelatedTagType = TagType[];

export type CommentType = {
  id: string;
  desc: string;
  user: {
    name: string;
    img: string;
  };
  createdAt: string;
  updatedAt: string;
}[];

export type CategoryType = {
  id: string;
  name: string;
  total: number;
}[];

export type FeedItemTypes = {
  id: string;
  img: string;
  title: string;
  slug: string;
  createdAt: string;
}[];

export type TagItemType = TagType[];

export type RelatedPostType = {
  id: string;
  img: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}[];

export type TopPostType = {
  id: string;
  title: string;
  slug: string;
  category: string[];
  createdAt: string;
}[];

export type FilterType = {
  id: string;
  name: string;
  value: string;
  label: string;
}[];
