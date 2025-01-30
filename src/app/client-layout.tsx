'use client';

import { useLayoutEffect, useState } from "react";
import LoadingScreen from "@/components/Nav/LoadingScreen";
import CustomCursor from "@/components/Nav/CustomCursor";

const ClientLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1,
          
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: isLoading ? 'none' : 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

        }}
      >
        {children}
      </div>
      {isLoading && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 50 
        }}>
          <LoadingScreen />
        </div>
      )}
    </>
  );
};

export default ClientLayout;