export const useSearch = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    handleSubmit,
  };
};
