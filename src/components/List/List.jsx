import Result from 'components/Result/Result';
import styles from '../Form/Form.module.css';

const List = ({ state, deleteItem }) => {
  return (
    <ul className={styles.gallery}>
      {state.filtered === false
        ? 'Not found'
        : state.isFilterOpen
        ? state.filtered.map(contact => (
            <Result data={contact} key={contact.id} deleteItem={deleteItem} />
          ))
        : state.data.map(contact => (
            <Result data={contact} key={contact.id} deleteItem={deleteItem} />
          ))}
    </ul>
  );
};

export default List;
