import styles from './Grocery.module.css'
import AppRouter from './routes/AppRouter';

function Grocery() {
  return (
    <>
    <div className={styles.Grocery}>
      <AppRouter />
    </div>
    </>
  )
}
export default Grocery;
