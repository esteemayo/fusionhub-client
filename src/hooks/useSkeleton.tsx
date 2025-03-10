import { useEffect, useMemo, useState } from 'react';

export const useSkeleton = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  const baseColor = useMemo(() => {
    return screenSize <= 768 ? '#152233' : '#021124';
  }, [screenSize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    baseColor,
  };
};
