import React from 'react';

interface PhilippineFlagProps {
  className?: string;
}

export const PhilippineFlag: React.FC<PhilippineFlagProps> = ({ className = "w-6 h-4" }) => (
  <svg viewBox="0 0 900 450" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="450" fill="#fff"/>
    <path d="M0 0h900v225H0z" fill="#0038a8"/>
    <path d="M0 225h900v225H0z" fill="#ce1126"/>
    <path d="M0 0l450 225L0 450z" fill="#fff"/>
    <circle cx="150" cy="225" r="40" fill="#fcd116"/>
    <path d="M150 165l8 40h-16zM150 285l8-40h-16zM90 225l40-8v16zM210 225l-40-8v16z" fill="#fcd116"/>
    <path d="M108 183l28 28-11 11zM192 267l-28-28 11-11zM108 267l28-28 11 11zM192 183l-28 28 11-11z" fill="#fcd116"/>
    <path d="M45 75l8 25-20-15 25 0-20 15zM45 375l8-25-20 15 25 0-20-15zM345 225l-25 8 15-20 0 25-15-20z" fill="#fcd116"/>
  </svg>
);
