import { useEffect, useState } from "react";

type Status = 'idle' | 'loading' | 'error' | 'success' | 'no-image';

export const useImageLoadStatus = (image: string | undefined) => {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!image) {
      setStatus('no-image');
      return;
    }

    const img = new Image();
    setStatus('loading');
    img.src = image;
    img.onload = () => setStatus('success');
    img.onerror = () => setStatus('error');
  }, [image]);

  return status;
};
