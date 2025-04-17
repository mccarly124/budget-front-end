import React, { useState, useEffect } from 'react';
import { addIncome, getIncome } from '../services/incomeapi.ts';
import { Income, NewIncomePost } from '../services/incomeapi.ts';


import styles from '../styles/IncomeComponent.module.css';



const IncomeComponent = () => {
  const [transactions, getTransactions] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTransaction, setNewIncome] = useState<NewIncomePost>({
    amount: 0,
    type: '',
    periodStart: '',
    periodEnd: ''
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);



  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const data = await getIncome();
        getTransactions(data);
      } catch (error: any) {
        console.error('Error fetching income:', error);
        const status = error?.status ?? error?.response?.status;
        const message = error?.message ?? error?.toString?.() ?? 'Unknown error';
      
        setErrorMessages(prev => [
          ...prev,
          status ? `(${status}) ${message}` : message
        ]);
      } finally {
        setLoading(false);
      }
    };


    fetchIncome();

  }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewIncome((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);
    try {
      const newTrans = await addIncome(newTransaction);
      getTransactions((prev) => [...prev, newTrans]);

      setNewIncome({
        amount: 0,
        type: '',
        periodStart: '',
        periodEnd: ''
      });

    } catch (error: any) {
      console.error('Error adding transaction:', error);
      setErrorMessages(prev => [
        ...prev,
        error?.message ?? error?.toString?.() ?? 'Unknown error adding transaction'
      ]);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Income</h1>
      <h2>
      {errorMessages.length > 0 && (
  <div className={styles.error}>
    <strong>Errors:</strong>
    <ul>
      {errorMessages.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  </div>
)}
      </h2>
      <div className={styles.formContainer}>
        
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={newTransaction.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={newTransaction.type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start of Pay Period:
          <input
            type="date"
            name="periodStart"
            value={newTransaction.periodStart}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          End of Pay Period:
          <input
            type="date"
            name="periodEnd"
            value={newTransaction.periodEnd}
            onChange={handleChange}
            required
          />
        </label>
        <button  className={styles.button} type="submit">Add Income</button>
      </form>
      </div>

      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Period Start</th>
            <th>Period End</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.periodStart}</td>
              <td>{transaction.periodEnd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );

}

export default IncomeComponent;