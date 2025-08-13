import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../redux/contactsSlice';
import { Contact } from '../types';

const ContactForm: React.FC<{ currentContact?: Contact; setCurrentContact?: (contact: Contact | null) => void }> = ({ currentContact, setCurrentContact }) => {
    const [name, setName] = useState(currentContact ? currentContact.name : '');
    const [email, setEmail] = useState(currentContact ? currentContact.email : '');
    const [phone, setPhone] = useState(currentContact ? currentContact.phone : '');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentContact) {
            dispatch(editContact({ ...currentContact, name, email, phone }));
        } else {
            dispatch(addContact({ id: crypto.randomUUID(), name, email, phone }));
        }
        clearFields();
    };

    const clearFields = () => {
        setName('');
        setEmail('');
        setPhone('');
        if (setCurrentContact) setCurrentContact(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <button type="submit">{currentContact ? 'Editar Contato' : 'Adicionar Contato'}</button>
        </form>
    );
};

export default ContactForm;
