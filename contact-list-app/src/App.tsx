import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import GlobalStyles from './styles/GlobalStyle';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <div>
        <h1>Lista de Contatos</h1>
        <ContactForm />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
