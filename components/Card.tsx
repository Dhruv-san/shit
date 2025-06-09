import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white/5 rounded-xl shadow-lg p-6 border border-blue-900/20 text-white ${className}`}>
    {children}
  </div>
);

export default Card;
