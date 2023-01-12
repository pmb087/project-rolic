import { useEffect } from 'react';

const useScript = (url: string, onload: () => void) => {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = onload;

    document.head.appendChild(script);
  }
};

export default useScript;
