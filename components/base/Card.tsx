import React from 'react';
import { Card as GluestackCard } from '../UI/card';

interface BaseCardProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "elevated" | "outline" | "ghost" | "filled";
  size?: "sm" | "md" | "lg";
}

export const Card: React.FC<BaseCardProps> = ({ 
  className, 
  children, 
  variant = "elevated",
  size = "md",
  ...props 
}) => {
  return (
    <GluestackCard 
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </GluestackCard>
  );
};
