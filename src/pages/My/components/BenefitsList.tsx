import React from 'react';

interface Benefit {
  id: number;
  text: string;
}

const DEFAULT_BENEFITS: Benefit[] = [
  { id: 1, text: 'Unlimited AI Grammar' },
  { id: 2, text: 'Template available' },
  { id: 3, text: 'Open Pro base' },
  { id: 4, text: 'Upgrade Grammer' },
];

interface BenefitsListProps {
  benefits?: Benefit[];
}

export const BenefitsList: React.FC<BenefitsListProps> = ({ 
  benefits = DEFAULT_BENEFITS 
}) => {
  return (
    <div>
      <h3 className="text-[length:var(--fs-body2)] font-semibold text-gray-5 uppercase tracking-wide mb-4">
        PRO BENEFITS INCLUDED
      </h3>
      
      <div className="space-y-3 mb-6">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-pink-40 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path 
                  d="M10 3L4.5 8.5L2 6" 
                  stroke="var(--color-white)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[length:var(--fs-body2)] text-gray-6">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};