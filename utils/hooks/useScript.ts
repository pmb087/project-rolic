const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;

const useScript = (type: 'Login' | 'Map', onload: () => void) => {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');

    script.async = true;
    script.defer = true;
    script.onload = onload;
    let scriptSrc = '';
    
    if (type === 'Login') scriptSrc = `https://accounts.google.com/gsi/client`;
    else if (type === 'Map') scriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;

    script.src = scriptSrc;
    document.head.appendChild(script);    
  }
};

export default useScript;
