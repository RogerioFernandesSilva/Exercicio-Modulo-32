import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactsState {
  list: Contact[];
}

const initialState: ContactsState = {
  list: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.list.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(contact => contact.id !== action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.list.findIndex(c => c.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
  },
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
