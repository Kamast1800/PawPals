import { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className="w-full">
      <div className={`max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
