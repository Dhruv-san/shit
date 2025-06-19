import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
  title?: string;
}

export function Header({ children, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-1 items-center justify-between">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
        {children}
      </div>
    </header>
  );
}
