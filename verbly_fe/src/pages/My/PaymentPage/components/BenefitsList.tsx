import React from 'react';

interface Benefit {
  id: number;
  text: string;
}

const DEFAULT_BENEFITS: Benefit[] = [
  { id: 1, text: 'Unlimited AI Grammar' },
  { id: 2, text: 'Unlimited AI Grammar' },
  { id: 3, text: 'Unlimited AI Grammar' },
  { id: 4, text: 'Unlimited AI Grammar' },
];

interface BenefitsListProps {
  benefits?: Benefit[];
}

export const BenefitsList: React.FC<BenefitsListProps> = ({ 
  benefits = DEFAULT_BENEFITS 
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        PRO BENEFITS INCLUDED
      </h3>
      
      <div className="space-y-3 mb-6">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <path 
                  d="M10 3L4.5 8.5L2 6" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};