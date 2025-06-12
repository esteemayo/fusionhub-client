import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { ISearch } from '../types';

export const useSearch: ISearch = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const query = e.target.value;

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
    navigate(`/posts?search=${searchQuery}`);
  };

  return {
    setSearchQuery,
    handleSubmit,
    handleKeyPress,
  };
};
