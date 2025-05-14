import React, { useState, useEffect } from 'react';
import { addExpense, getExpenses } from '../services/expensesapi.ts';
import { Expense, NewExpense } from '../services/expensesapi.ts';

import styles from '../styles/IncomeComponent.module.css';


const defaultTransaction: NewExpense = {
    category: '',
    subcategory: '',
    price: 0,
    date: '',
    split: false,
    note: ''
  };


const ExpenseComponent = () => {
  const [expense, getAllExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [newexpense, setNewExpense] = useState<NewExpense>(defaultTransaction);


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        getAllExpenses(data);
      } catch (error: any) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchExpenses();

  }, []); 
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewExpense((prev) => ({
        ...prev,
        [name]: value,
      }));
    };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newEx = await addExpense(newexpense);
      getAllExpenses((prev) => [...prev, newEx]);

      setNewExpense(defaultTransaction);

    } catch (error: any) {
      console.error('Error adding transaction:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  
  
    return (
<div>
      <h1>Expenses</h1>
      <div className={styles.formContainer}>
        
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newexpense.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subcategory:
          <input
            type="text"
            name="subcategory"
            value={newexpense.subcategory}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newexpense.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newexpense.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Split:
          <input
            type="checkbox"
            name="split"
            checked={newexpense.split}
            onChange={(e) =>
            setNewExpense((prev) => ({
            ...prev,
            split: e.target.checked,
            }))
            }
            required
        />
        </label>
        <label>
          Note:
          <input
            type="string"
            name="note"
            value={newexpense.note}
            onChange={handleChange}
          />
        </label>
        <button  className={styles.button} type="submit">Add Transaction</button>
      </form>
      </div>

      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Date</th>
            <th>Split</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((ex) => (
            <tr key={ex.id}>
              <td>{ex.id}</td>
              <td>{ex.category}</td>
              <td>{ex.subcategory}</td>
              <td>{ex.price}</td>
              <td>{ex.date}</td>
              <td>{ex.split.toString()}</td>
              <td>{ex.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



    </div>
    );
  }

export default ExpenseComponent;