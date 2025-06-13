import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { ISearch } from '../types';

export const useSearch: ISearch = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const query = target.value.trim();

    if (pathname === '/posts') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        search: query,
      });
    } else {
      navigate(`/posts?search=${query}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery) {
      navigate(`/posts?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return {
    setSearchQuery,
    handleSubmit,
    handleKeyPress,
  };
};
