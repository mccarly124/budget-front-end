const API_URL = 'http://localhost:8080/income';

export const getIncome = async (): Promise<Income[]> => {
  const response = await fetch(`${API_URL}/get`);

  if (!response.ok) {
    let message = 'Failed to fetch income data';
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      message = "Not JSON";
    }
    const error: any = new Error(message);
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export const addIncome = async (transaction: NewIncomePost): Promise<Income> => {
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

export type Income = {
  id: number;
  amount: number;
  type: string;
  periodStart: string;
  periodEnd: string;
};

export type NewIncomePost = Omit<Income, 'id'>;