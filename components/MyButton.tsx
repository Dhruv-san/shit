import React from 'react';

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const MyButton: React.FC<MyButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default MyButton;
