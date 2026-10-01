import React, { useState } from 'react';

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: number) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || Number(amount) <= 0) return;

    onAddExpense(description.trim(), Number(amount));
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="지출 내역 (예: 점심 식사)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="금액 (원)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        추가
      </button>
    </form>
  );
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  flex: 1,
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#4caf50',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
};