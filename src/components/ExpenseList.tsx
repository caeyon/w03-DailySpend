import React from 'react';
import type { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return <p style={{ color: '#888', textAlign: 'center', padding: '20px 0' }}>오늘 지출한 내역이 없습니다.</p>;
  }

  return (
    // 💡 스크롤을 감싸는 컨테이너 추가
    <div style={scrollContainerStyle}>
      <ul style={listStyle}>
        {expenses.map((item) => (
          <li key={item.id} style={itemStyle}>
            <span style={{ wordBreak: 'break-all' }}>{item.description}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <strong style={{ fontSize: '1rem' }}>
                {item.amount.toLocaleString()}원
              </strong>
              <button
                onClick={() => onDeleteExpense(item.id)}
                style={deleteButtonStyle}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 💡 지정한 높이(320px)를 넘어가면 Y축 스크롤바 생성
const scrollContainerStyle: React.CSSProperties = {
  maxHeight: '320px',
  overflowY: 'auto',
  paddingRight: '4px', // 스크롤바와 내용 사이 살짝 여백
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 8px',
  borderBottom: '1px solid #eee',
  gap: '12px',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#ff4d4f',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 10px',
  cursor: 'pointer',
  fontSize: '0.85rem',
};