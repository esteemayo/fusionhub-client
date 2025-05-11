import React, { HTMLInputTypeAttribute } from 'react';
import { Action } from 'redux';
import ReactQuill, { DeltaStatic, EmitterSource } from 'react-quill-new';
import { IconType } from 'react-icons/lib';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Value } from 'react-phone-number-input';

export interface LogoProps {
  isOpen?: boolean;
  onClose?(e: React.MouseEvent<HTMLAnchorElement>): void;
}

export interface NavItemProps {
  url: string;
  label: string;
}

export interface MenuItemProps {
  url: string;
  label: string;
  onClose(): void;
}

export interface FooterMenuItemProps {
  url: string;
  label: string;
}

export interface SocialMenuItemProps {
  url: string;
  icon: IconType;
}

export interface ImageProps {
  alt?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

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
  validate?: boolean;
  onClick?(): void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: boolean;
  options: CategoryOptionType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void;
}

export interface CountrySelectProps {
  name: string;
  label?: string;
  value?: CountrySelectType;
  placeholder?: string;
  validate?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange(name: string, value: CountrySelectType | string): void;
}

export interface TextQuillProps {
  id?: string;
  label?: string;
  value: ReactQuill.Value | undefined;
  placeholder?: string;
  validate?: boolean;
  error?: string;
  onChange?(
    value: ReactQuill.Value | undefined,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ): void;
}

export interface DateInputProps {
  label?: string;
  startDate: Date | null;
  placeholder?: string;
  validate?: boolean;
  error?: string;
  onChange: React.Dispatch<React.SetStateAction<Date | null>>;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  disabled?: boolean;
  color: 'dark' | 'primary' | 'outline';
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface FormButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface PostClientProps {
  isOpen: boolean;
  ref: React.LegacyRef<HTMLInputElement> | undefined;
}

export interface CommentProps {
  onAction?(): void;
  onUpdate?(): void;
  onOpen(): void;
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
  onOpen(): void;
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

export interface PostDescriptionProps {
  value: ReactQuill.Value | undefined;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChangeDesc?(
    value: ReactQuill.Value | undefined,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ): void;
}

export interface PostImageProps {
  options: CategoryOptionType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>): void;
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
  loading: boolean;
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
  activeMenu?: string;
  onAction(): void;
}

export interface BannerProps {
  file: File | undefined;
  banner: File | undefined;
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeBanner(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface ProfileImageProps {
  ref: React.LegacyRef<HTMLInputElement>;
  file: File | undefined;
  onOpen(e: React.MouseEvent<HTMLButtonElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onUpload(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface PhoneNumberProps {
  label?: string;
  value: Value | undefined;
  placeholder?: string;
  validate?: boolean;
  error?: string;
  onChange(value?: Value): void;
}

export interface ToggleButtonProps {
  type?: 'nav';
  label?: string;
  isOpen: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ILogout {
  (isOpen?: boolean, onClose?: () => Action): {
    btnLabel: string;
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

export interface ContactInfoItemProps {
  icon: string;
  phone?: string;
  email?: string;
  location?: string;
  text: string;
}

export interface ContactHeadingProps {
  title: string;
  subtitle: string;
  text?: 'sm';
  type: 'lg' | 'md' | 'sm';
}

export interface AboutItemProps {
  title: string;
  subtitle: string;
}

export interface TeamItemProps {
  img: string;
  name: string;
  role: string;
  socials: IconType[];
}

export interface PostContentProps {
  post: PostDetailType;
  loading: boolean;
}

export interface PostDetailProps {
  post: PostDetailType;
  loading: boolean;
}

export interface PostDetailActionProps {
  post: PostDetailType;
}

export interface PostDescProps {
  post: PostDetailType;
  loading: boolean;
}

export interface RegisterInputs {
  name: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  bio?: string;
  about?: string;
}

export interface CurrentUserType {
  details: UserDetailType;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: CurrentUserType | null;
  name?: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ErrorPayload {
  response?: {
    data?: {
      message: string;
    };
  };
}

type UserDetailType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  country: string;
  bio: string;
  about?: string;
  image?: string;
  banner?: string;
  savedPosts: string[];
  fromGoogle: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MenuItemType = {
  id: number;
  url: string;
  label: string;
}[];

export type FooterMenuType = {
  id: number;
  url: string;
  label: string;
}[];

export type SocialMenuType = {
  id: number;
  url: string;
  icon: IconType;
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

export type PostDetailType = {
  id: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  author: {
    id: string;
    name: string;
    username: string;
    img: string;
  };
  likes: string[];
  dislikes: string[];
  likeCount: number;
  dislikeCount: number;
  comments: CommentType;
  views: number;
  createdAt: string;
  updatedAt: string;
};

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

export type PasswordInputType = {
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

export type ContactInfoItemType = {
  id: number;
  icon: string;
  phone?: string;
  email?: string;
  location?: string;
  text: string;
}[];

export type aboutItemType = {
  id: number;
  title: string;
  subtitle: string;
}[];

export type TeamType = {
  id: number;
  img: string;
  name: string;
  role: string;
  socials: IconType[];
}[];

export type PartnerItemType = {
  id: number;
  imgSrc: string;
  alt?: string;
}[];

export type CountrySelectType = {
  flag: string;
  label: string;
  region: string;
  value: string;
};

export type RegisterUserType = {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone?: Value;
  dateOfBirth?: Date | null;
  country?: string;
  bio?: string;
  about?: ReactQuill.Value;
  image?: File;
  banner?: File;
};

export type AuthCrendentialType = {
  identifier: string;
  password: string;
};

export type ResetPasswordType = {
  password: string;
  passwordConfirm: string;
};

export type UpdatePasswordType = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

export type UpdateUserDataType = {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  bio?: string;
  about?: string;
  image?: string;
};
