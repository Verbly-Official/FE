import React from 'react';
import { Badge } from '../../../components/Badge/Badge';

interface SectionHeaderProps {
  number: number;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Badge
        content='number'
        variant='primary'
        count={number}
      />
      <h2 className="text-[length:var(--fs-title1)] text-gray-7 font-bold">
        {title}
      </h2>
    </div>
  );
};