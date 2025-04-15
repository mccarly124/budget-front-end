import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/HomepageComponent.module.css';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link to="/grocery">
        <button className={styles.button}>Go to Grocery Page</button>
      </Link>
      <div className="divider"/>
      <Link to="/income">
        <button className={styles.button}>Go to Income Page</button>
      </Link>
      <div className="divider"/>
      <Link to="/expense">
        <button className={styles.button}>Go to Expense Page</button>
      </Link>
      <div className="divider"/>
      <Link to="/overview">
        <button className={styles.button}>See Overview</button>
      </Link>
    </div>
  );
};

export default Home;