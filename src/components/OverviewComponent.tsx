 import React, { useState, useEffect } from 'react';
 import { TotalExpenses, getTotalExpenses } from '../services/expensesapi.ts';


const defaultMonthly: TotalExpenses = {totalExpenses: 0}

const OverviewComponent = () => {
  const [selectedDate, setSelectedDate] = useState<{year: number; month: number}>({ year: 2025, month: 1 });
  const [expenseByMonth, getExpenseForMonth] = useState<TotalExpenses>(defaultMonthly);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const data = await getTotalExpenses(selectedDate.year,selectedDate.month);
          getExpenseForMonth(data);
        } catch (error: any) {
          console.error('Error fetching expenses:', error);
        } finally {
          setLoading(false);
        }
      };
  
  
      fetchExpenses();
  
    }, [selectedDate]);

    return (
      <div>
        <input
          type="month"
          value={`${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}`}
          onChange={(e) => {
            const [year, month] = e.target.value.split('-').map(Number);
            setSelectedDate({ year, month });
          }}
        />
        <h1>Total expenses for this month: {expenseByMonth.totalExpenses}</h1>
        <h2></h2>
      </div>
    );
  
   }
 export default OverviewComponent;