import { Value } from 'react-phone-number-input';
import React from 'react';
import ReactQuill, { DeltaStatic, EmitterSource } from 'react-quill-new';

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

export interface LabelProps {
  id?: string;
  label?: string;
  onClick?(): void;
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

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  options: CategoryOptionType;
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void;
}

export interface TextQuillProps {
  id?: string;
  label?: string;
  value: ReactQuill.Value | undefined;
  onChange?(
    value: ReactQuill.Value | undefined,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ): void;
}

type ButtonType = 'button' | 'reset' | 'submit';

export interface ButtonProps {
  label: string;
  img?: string;
  type?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  className: 'primary' | 'outline';
}

export interface FormButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
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
  category: string;
  createdAt: string;
}

export interface PostMenuButtonProps {
  isOpen: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  type?: 'cancel';
  size?: 'small' | 'full';
  loading?: boolean;
  disabled?: boolean;
  actionLabel?: string;
  secondaryActionLabel?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  onClose(): void;
  onSubmit(): void;
  secondaryAction?(): void;
}

export interface SpinnerProps {
  size?: number;
  color?: string;
}

export interface PostListProps {
  posts: PostItemType;
}

export interface AccountHeadingProps {
  title: string;
  subtitle: string;
  type?: 'profile';
}

export interface AccountHeaderProps {
  title: string;
  subtitle: string;
}

export interface AccountMenuItemProps {
  id: string;
  url: string;
  icon: string;
  label: string;
  activeMenu: string;
  onAction(id: string): void;
}

export interface ProfileImageProps {
  ref: React.LegacyRef<HTMLInputElement>;
  onUpload(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface PhoneNumberProps {
  value: Value | undefined;
  onChange(value?: Value): void;
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
  category: string;
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

export type CategoryOptionType = {
  id: string;
  name: string;
}[];

export type AccountMenuType = {
  id: string;
  url: string;
  icon: string;
  label: string;
}[];
