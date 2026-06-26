'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeatureContextProps {
  activeId: number;
  setActiveId: (id: number) => void;
}

const FeatureContext = createContext<FeatureContextProps | undefined>(undefined);

export const FeatureProvider = ({ children }: { children: ReactNode }) => {
  const [activeId, setActiveId] = useState<number>(1); // Default to first feature

  return (
    <FeatureContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeature = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeature must be used within a FeatureProvider');
  }
  return context;
};
