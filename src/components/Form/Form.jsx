import React, { Component } from 'react';
import styles from './Form.module.css';
import Filter from 'components/Filter/Filter';
import List from 'components/List/List';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
export class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filtered: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.filterItem = this.filterItem.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const contact = {
      name: evt.target.elements.name.value,
      number: evt.target.elements.number.value,
      id: nanoid(),
    };
    let reservedName = false;
    this.state.data.find(user => {
      if (user.name === contact.name) {
        reservedName = true;
      }

      return null;
    });
    if (reservedName === true) {
      Notiflix.Notify.failure('You should take another name');
      return;
    } else {
      Notiflix.Notify.success(`User ${contact.name} added!`);
      this.setState(prevState => ({
        data: [...prevState.data, contact],
      }));
      evt.target.elements.name.value = '';
      evt.target.elements.number.value = '';
    }
  }

  deleteItem(evt) {
    // evt.target.getAttribute('data-id');
    const idToDelete = evt.target.getAttribute('data-id');
    const newData = this.state.data.filter(
      contact => contact.id !== idToDelete
    );
    this.setState({ data: newData });
  }

  filterItem(evt) {
    if (!evt.target.value) {
      this.setState({ filtered: [] });
    } else {
      const filteredItems = this.state.data.filter(person =>
        person.name.toLowerCase().includes(evt.target.value.toLowerCase())
      );
      if (filteredItems.length) {
        this.setState(() => ({ filtered: filteredItems }));
      } else {
        this.setState(() => ({ filtered: 'Not found' }));
      }
    }
  }

  render() {
    return (
      <>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h2 className={styles.title}>Phonebook</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number">Number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button className={styles.submitBtn} type="submit">
            Add contact
          </button>
        </form>
        <Filter filterItem={this.filterItem} />
        <List state={this.state} deleteItem={this.deleteItem} />
      </>
    );
  }
}
