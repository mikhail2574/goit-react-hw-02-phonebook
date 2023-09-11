import styles from './Filter.module.css';

const Filter = ({ filterItem }) => {
  const searchFocus = () => {
    document.querySelector('form').style.display = 'none';
  };
  const searchOffFocus = () => {
    document.querySelector('form').style.display = 'flex';
  };
  return (
    <div className={styles.search}>
      <h2>Find contact by name</h2>
      <input
        className={styles.inputSearch}
        type="text"
        name="search"
        onInput={filterItem}
        onFocus={searchFocus}
        onBlur={searchOffFocus}
      />
    </div>
  );
};

export default Filter;
