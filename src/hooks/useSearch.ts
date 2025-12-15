import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { ISearch } from '../types';

export const useSearch: ISearch = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const executeSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (pathname === '/posts') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        search: trimmed,
      });
    } else {
      navigate(`/posts?search=${trimmed}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const target = e.target as HTMLInputElement;
    executeSearch(target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    executeSearch(searchQuery);
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    executeSearch,
    handleSubmit,
    handleKeyPress,
  };
};
