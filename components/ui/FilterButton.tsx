interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
          : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/50 hover:scale-105'
        }
      `}
    >
      {children}
    </button>
  );
}
