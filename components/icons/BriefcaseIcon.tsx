import React from 'react';

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.45-2.25 2.653-1.286.203-2.525.26-3.75.26s-2.464-.057-3.75-.26C9.214 20.675 8.25 19.538 8.25 18.225V14.15M12 12.375v-3.75m0 0c1.406 0 2.5-1.094 2.5-2.5 0-1.406-1.094-2.5-2.5-2.5s-2.5 1.094-2.5 2.5c0 1.406 1.094 2.5 2.5 2.5zm0 0v.01M3.75 6.75h16.5M3.75 6.75c-1.24 0-2.25.985-2.25 2.25v9.75c0 1.265 1.01 2.25 2.25 2.25h16.5c1.24 0 2.25-.985 2.25-2.25V9c0-1.265-1.01-2.25-2.25-2.25H3.75z" />
  </svg>
);