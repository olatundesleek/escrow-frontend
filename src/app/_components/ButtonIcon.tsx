'use client';

export default function ButtonIcon({
  children,
  onClick,
  isActive,
  style = '',
  toolTip,
  tipPosition = '-left-8',
  isLoading = false,
}: {
  children: React.ReactNode;
  onClick?: React.Dispatch<boolean> | (() => void);
  isActive?: boolean;
  style?: string;
  toolTip?: string;
  tipPosition?: string;
  isLoading?: boolean;
}) {
  return (
    <>
      <button
        onClick={() => onClick && onClick(!isActive)}
        type='button'
        className={`p-2 border border-dashboard-border cursor-pointer hover:bg-dashboard-secondary hover:text-dashboard-primary rounded transition-colors duration-300 ease-in mx-0.5 ${
          isActive
            ? 'bg-dashboard-secondary text-dashboard-primary'
            : 'bg-transparent  text-dashboard-secondary'
        } ${style} relative group overflow-y-visible ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {children}
        {toolTip && (
          <div
            className={`absolute -bottom-7 ${tipPosition} hidden group-hover:block text-xs bg-dashboard-secondary text-white px-2 py-1 rounded shadow-md font-black z-50`}
          >
            {toolTip}
          </div>
        )}
      </button>
    </>
  );
}
