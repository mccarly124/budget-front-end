const API_URL = 'http://localhost:8080/expenses';

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(`${API_URL}/get`);
  if (!response.ok) {
    throw new Error('Failed to fetch expenses data');
  }
  return response.json();
};

export const addExpense = async (ex: NewExpense): Promise<Expense> => {
  const response = await fetch(`${API_URL}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ex),
  });
  if (!response.ok) {
    throw new Error('Failed to add expense');
  }
  return response.json();
};

export const getTotalExpenses = async (year: number, month: number): Promise<TotalExpenses> => {
  const response = await fetch(`${API_URL}/total?year=${year}&month=${month}`);
  if (!response.ok) {
    throw new Error('Failed to fetch total monthly expenses data');
  }
  return response.json();
};

export type Expense = {
  id: number;
  category: string;
  subcategory: string;
  price: number;
  date: string;
  split: boolean;
  note: string;
};

export type NewExpense = Omit<Expense, 'id'>;

export type TotalExpenses = {
  totalExpenses: number;
};