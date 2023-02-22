import { RefObject, useCallback, useRef } from 'react';

export const useFocus = (): [RefObject<HTMLInputElement>, VoidFunction] => {
  const htmlElRef = useRef<HTMLInputElement>(null);
  const setFocus = useCallback(() => {
    if (htmlElRef.current) {
      htmlElRef.current.focus();
    }
  }, [htmlElRef]);

  return [htmlElRef, setFocus];
};
