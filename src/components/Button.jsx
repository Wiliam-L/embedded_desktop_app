import { useMemo } from "react";

export const Button = ({label, onClick, variant = 'primary', className = '', disabled = false, width = 'w-[50%]' }) => {
    const baseStyle = 'p-2 font-semibold text-white rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg';
    
    const variantStyles = useMemo(() => ({

      primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    }), []);
  
    const style = `${baseStyle} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${width}`;
  
    return (
      <button onClick={onClick} className={style} disabled={disabled}>
        {label}
      </button>
    );
  };