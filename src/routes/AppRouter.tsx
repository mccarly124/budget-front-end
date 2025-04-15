import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroceryTransactionComponent from '../components/GroceryTransactionComponent';
import HomePage from '../components/HomepageComponent';
import IncomeComponent from '../components/IncomeComponent';
import ExpenseComponent from '../components/ExpenseComponent';
import OverviewComponent from '../components/OverviewComponent';

function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grocery" element={<GroceryTransactionComponent />} />
          <Route path="/income" element={<IncomeComponent />} />
          <Route path="/expense" element={<ExpenseComponent />} />
          <Route path="/overview" element={<OverviewComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;