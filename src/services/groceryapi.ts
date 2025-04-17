const API_URL = 'http://localhost:8080/grocery';

export const getTransactions = async (): Promise<GroceryTransaction[]> => {
  const response = await fetch(`${API_URL}/get`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const addTransaction = async (transaction: NewGroceryTransaction): Promise<GroceryTransaction> => {
  const response = await fetch(`${API_URL}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  if (!response.ok) {
    throw new Error('Failed to add transaction');
  }
  return response.json();
};

export type GroceryTransaction = {
  id: number;
  name: string;
  store: string;
  price: number;
  date: string;
  category: string;
};

export type NewGroceryTransaction = Omit<GroceryTransaction, 'id'>;