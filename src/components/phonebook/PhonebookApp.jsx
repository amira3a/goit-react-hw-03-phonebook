import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../contact-form/ContactForm';
import ContactList from '../contact-list/ContactList';
import Filter from '../filter/Filter';

function PhonebookApp() {
  const [state, setState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  });
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setState(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state));
  }, [state]);

  function handleNameChange (event)  {
    setState({ ...state, name: event.target.value });
  };

  function handleNumberChange  (event)  {
    setState({ ...state, number: event.target.value });
  };

  function handleFilterChange  (event)  {
    setState({ ...state, filter: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const existingContactName = state.contacts.find(
      (contact) => contact.name.toLowerCase() === state.name.toLowerCase() 
    )
    const existingContactNumber = state.contacts.find(
      (contact) => contact.number === state.number 
    );
    if (existingContactName) {
      alert(`${state.name} is already in the phonebook!`);
      return;
    }
    if (existingContactNumber) {
      alert(`${state.number} is already in the phonebook!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: state.name,
      number: state.number,
    };
    setState({
      ...state,
      contacts: [...state.contacts, newContact],
      name: '',
      number: '',
    });
  };

  function handleDelete  (id)  {
    setState({
      ...state,
      contacts: state.contacts.filter((contact) => contact.id !== id),
    });
  };

  const filteredContacts = state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(state.filter.toLowerCase())
||  contact.number.toLowerCase().includes(state.filter.toLowerCase())
  );
  

  return (
    <div>
      <h1>Contact Book</h1>
      <ContactForm
        name={state.name}
        number={state.number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Contacts</h2>
      <Filter value={state.filter} handleChange={handleFilterChange} />
      <ContactList contacts={filteredContacts}   handleDelete={handleDelete} />
    </div>
  );
}

export default PhonebookApp;