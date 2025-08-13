import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../redux/contactsSlice';
import styled from 'styled-components';
import { Contact } from '../types';




const ContactList: React.FC = () => {
    const contacts = useSelector((state: any) => state.contacts);
    const dispatch = useDispatch();

    const handleRemoveContact = (id: string) => {
        dispatch(removeContact(id));
    };

    return (
        <div>
            <h2>Lista de Contatos</h2>
            <ul>
                {contacts.map((contact: Contact) => (
                    <li key={contact.id}>
                        <span>{contact.fullName}</span>
                        <span>{contact.email}</span>
                        <span>{contact.phone}</span>
                        <button onClick={() => handleRemoveContact(contact.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
