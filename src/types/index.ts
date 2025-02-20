import { Value } from 'react-phone-number-input';
import React, { HTMLInputTypeAttribute } from 'react';
import ReactQuill, { DeltaStatic, EmitterSource } from 'react-quill-new';
import { Action } from 'redux';

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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
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
  ref?: React.LegacyRef<HTMLTextAreaElement> | undefined;
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

export interface DateInputProps {
  startDate: Date | null;
  placeholder?: string;
  onChange: React.Dispatch<React.SetStateAction<Date | null>>;
}

type ButtonType = 'button' | 'reset' | 'submit';

export interface ButtonProps {
  label: string;
  img?: string;
  type?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  className: 'primary' | 'outline';
  onClick?(): void;
}

export interface FormButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface CommentProps {
  onAction?(): void;
  onUpdate?(): void;
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
  onReply?(): void;
  onUpdate?(): void;
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
  isOpen: boolean;
  activeMenu: string;
  onAction(id: string): void;
}

export interface ProfileImageProps {
  ref: React.LegacyRef<HTMLInputElement>;
  onUpload(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface PhoneNumberProps {
  label?: string;
  value: Value | undefined;
  placeholder?: string;
  onChange(value?: Value): void;
}

export interface ToggleButtonProps {
  label?: string;
  isOpen: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ILogout {
  (isOpen?: boolean, onClose?: () => Action): {
    handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
}

export interface FeatureProps {
  img?: string;
  desc: string;
  title: string;
  slug: string;
  createdAt: string;
}

export interface FeatureCardProps {
  img?: string;
  title: string;
  slug: string;
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
  category: string;
  isFeatured: boolean;
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

export type LoginInputType = {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
}[];

export type RegisterInputType = {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
}[];

export type ResetInputType = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
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

export type CommentUserType = {
  id: string;
  img: string;
}[];
