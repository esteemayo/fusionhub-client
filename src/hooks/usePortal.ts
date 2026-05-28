import { useEffect, useState } from 'react';

export const usePortal = (id: string) => {
  const [portalId, setPortalId] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalId(document.getElementById(id));
  }, [id]);

  return { portalId };
};
