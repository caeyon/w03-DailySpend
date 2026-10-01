import { useState } from 'react';
import type { Expense } from './types/expense';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (description: string, amount: number) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '16px' }}>💸 오늘 하루 지출 계산기</h2>

      <ExpenseForm onAddExpense={handleAddExpense} />

      {/* 💡 이 영역 내부에서만 스크롤이 생김 */}
      <div style={listWrapperStyle}>
        <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
      </div>

      {/* 💡 맨 아래 고정 바닥 */}
      <div style={footerStyle}>
        <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #eee' }} />
        <div style={totalStyle}>
          <span>오늘 총 지출:</span>
          <span style={{ fontSize: '1.3rem', color: '#1677ff' }}>
            {totalAmount.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: '480px',
  height: '520px',
  margin: '40px auto',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  backgroundColor: '#fff',
  fontFamily: 'sans-serif',
  display: 'flex',
  flexDirection: 'column',
};

const listWrapperStyle: React.CSSProperties = {
  flex: 1,           // 남은 가운데 공간을 차지
  overflowY: 'auto', // 내용이 많아지면 안에서만 스크롤
  margin: '12px 0',
  paddingRight: '4px',
};

const footerStyle: React.CSSProperties = {
  marginTop: 'auto', // 하단 고정
};

const totalStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold',
};