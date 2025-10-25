// TODO: Add to experimental branch or gist.
import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export const useElementSize = <
  T extends HTMLElement = HTMLDivElement,
>(
  elementRef: RefObject<T | null>,
  getSize: (element: T) => number,
) => {
  const [size, setSize] = useState(0);

  const calculateSize = useCallback(() => {
    if (elementRef.current) {
      const updatedSize = getSize(elementRef.current);
      setSize(updatedSize);
    }
  }, [elementRef]);

  useLayoutEffect(() => {
    calculateSize();

    window.addEventListener('resize', calculateSize);

    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [calculateSize]);

  useLayoutEffect(() => {
    if (elementRef.current && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(calculateSize);
      observer.observe(elementRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [calculateSize, elementRef]);

  return size;
};
