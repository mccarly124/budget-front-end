import styles from './Grocery.module.css'
import GroceryTransactionComponent from './components/GroceryTransactionComponent';

function Grocery() {
  return (
    <>
    <div className={styles.Grocery}>
    <h1>Grocery Transactions</h1>
      <GroceryTransactionComponent />
    </div>
    </>
  )
}
export default Grocery
