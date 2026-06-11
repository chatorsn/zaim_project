interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div onClick={onClick} className={`bg-white border border-[#E8E0D7] rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition ${className}`}>
      {children}
    </div>
  );
}
