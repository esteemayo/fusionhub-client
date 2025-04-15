import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
}));

export const useCountries = () => {
  const getAll = () => formattedCountries;

  return {
    getAll,
  };
};
