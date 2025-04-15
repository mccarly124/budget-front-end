import React, { useState, useEffect } from 'react';
import { addTransaction, getTransactions } from '../services/api.ts';
import styles from '../styles/GroceryTransactionComponent.module.css';


type GroceryTransaction = {
  id: number;
  name: string;
  store: string;
  price: number;
  date: string;
  category: string;
};

type NewGroceryTransaction = Omit<GroceryTransaction, 'id'>;



const GroceryTransactionComponent = () => {
  const [transactions, setTransactions] = useState<GroceryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTransaction, setNewTransaction] = useState<NewGroceryTransaction>({
    name: '',
    store: '',
    price: 0,
    date: '',
    category: '',
  });
 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {


      const newTrans = await addTransaction(newTransaction);
      setTransactions((prev) => [...prev, newTrans]);

      setNewTransaction({
        name: '',
        store: '',
        price: 0,
        date: '',
        category: '',
      });

    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Grocery Transactions</h1>
      <div className={styles.formContainer}>
        
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newTransaction.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Store:
          <input
            type="text"
            name="store"
            value={newTransaction.store}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newTransaction.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleChange}
            required
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
            <th>Name</th>
            <th>Store</th>
            <th>Price</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.store}</td>
              <td>{transaction.price}</td>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



    </div>
    
  );
};

export default GroceryTransactionComponent;