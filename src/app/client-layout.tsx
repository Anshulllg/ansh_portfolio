'use client';

import { useLayoutEffect, useState } from "react";
import LoadingScreen from "@/components/Nav/LoadingScreen";
import CustomCursor from "@/components/Nav/CustomCursor";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      {isLoading ? <LoadingScreen /> : children}
    </>
  );
}