import React from 'react';
import { TextField } from '../../../components/TextArea/TextField';

interface CardFormProps {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  onCardNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onExpirationDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
}

export const CardForm: React.FC<CardFormProps> = ({
  cardName,
  cardNumber,
  expirationDate,
  cvv,
  onCardNameChange,
  onCardNumberChange,
  onExpirationDateChange,
  onCvvChange,
}) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[length:var(--fs-body2)] font-medium text-gray-7 mb-2">
          Name on Card
        </label>
        <TextField 
          shape='square'
          value={cardName}
          onChange={(e) => onCardNameChange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-[length:var(--fs-body2)] font-medium text-gray-7 mb-2">
          Card Number
        </label>
        <TextField 
          shape='square'
          value={cardNumber}
          onChange={(e) => onCardNumberChange(e.target.value)}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[length:var(--fs-body2)] text-gray-7 mb-2">
            Expiration Date
          </label>
          <TextField 
            shape='square'
            value={expirationDate}
            onChange={(e) => onExpirationDateChange(e.target.value)}
            placeholder="MM / YY"
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-[length:var(--fs-body2)] text-gray-7 mb-2">
            CVC / CC
          </label>
          <TextField 
            shape='square'
            value={cvv}
            onChange={(e) => onCvvChange(e.target.value)}
            placeholder="123"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
};