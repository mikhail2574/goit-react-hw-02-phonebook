import React, { Component } from 'react';
import styles from './Form.module.css';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import List from 'components/List/List';

export class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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
    const idToDelete = evt.target.getAttribute('data-id');
    this.setState({
      data: this.state.data.filter(contact => contact.id !== idToDelete),
    });
  }

  onInputChange(value) {
    this.setState({
      name: value,
    });
  }

  filterItem() {
    return this.state.data.filter(person =>
      person.name.toLowerCase().includes(this.state.name.toLowerCase())
    );
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
        <Filter
          deleteItem={this.deleteItem}
          onInputChange={this.onInputChange}
        />
        {this.state.name !== '' ? (
          <List data={this.filterItem()} deleteItem={this.deleteItem} />
        ) : (
          <List data={this.state.data} deleteItem={this.deleteItem} />
        )}
      </>
    );
  }
}
