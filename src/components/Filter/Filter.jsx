import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import List from 'components/List/List';

const Filter = ({ filterItem, deleteItem }) => {
  const searchFocus = () => {
    document.querySelector('form').style.display = 'none';
  };
  const searchOffFocus = () => {
    document.querySelector('form').style.display = 'flex';
  };
  return (
    <>
      <div className={styles.search}>
        <h2>Найти контакт по имени</h2>
        <input
          className={styles.inputSearch}
          type="text"
          name="search"
          onInput={filterItem}
          onFocus={searchFocus}
          onBlur={searchOffFocus}
        />
      </div>
      <List data={filterItem()} deleteItem={deleteItem} />{' '}
    </>
  );
};

Filter.propTypes = {
  filterItem: PropTypes.func,
};

export default Filter;
