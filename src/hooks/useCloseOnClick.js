import { useEffect, useRef } from 'react';

const useCloseOnClick = (handlerFn, listenCapturing = true) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerFn();
      }
    };
    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handlerFn, listenCapturing]);

  return ref;
};

export default useCloseOnClick;
