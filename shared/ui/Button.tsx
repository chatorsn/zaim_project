'use client';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button({ href, onClick, type = 'button', variant = 'primary', className = '', children, fullWidth = false, disabled = false }: ButtonProps) {
  const baseStyles = "inline-flex justify-center items-center px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition text-sm md:text-base";
  const variants = {
    primary: "bg-[#5F5247] text-white hover:bg-[#7B6652] disabled:opacity-50",
    secondary: "border border-[#5F5247] text-[#5F5247] hover:bg-[#5F5247] hover:text-white"
  };
  const widthClass = fullWidth ? "w-full sm:w-auto" : "w-auto";

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}>
      {children}
    </button>
  );
}
