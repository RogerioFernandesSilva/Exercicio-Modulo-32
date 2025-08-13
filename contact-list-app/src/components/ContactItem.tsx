import React from 'react';
import { useDispatch } from 'react-redux';
import { removeContact } from '../redux/contactsSlice';
import styled from 'styled-components';
import { Contact } from '../types';

const ContactItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  border-radius: 5px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #ff1a1a;
  }
`;


interface ContactItemProps {
  contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeContact(contact.id));
  };

  return (
    <ContactItemContainer>
      <ContactInfo>
        <p>{contact.name}</p>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
      </ContactInfo>
      <Button onClick={handleRemove}>Remove</Button>
    </ContactItemContainer>
  );
};

export default ContactItem;