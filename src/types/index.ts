import React from 'react';

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

export interface AuthLinkProps {
  url: string;
  label: string;
  urlLabel: string;
}
