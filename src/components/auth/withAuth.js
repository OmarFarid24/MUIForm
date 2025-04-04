import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    
    useEffect(() => {
      const isAuthenticated = false;
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, []);

    return <Component {...props} />;
  };
};