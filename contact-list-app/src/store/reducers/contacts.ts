import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contatos from '../../models/Contatos'
import * as enums from '../../utils/enums/contatos'

type ContatosState = {
  itens: Contatos[]
}

const initialState: ContatosState = {
  itens: [
    {
      grupos: enums.Grupos.WORK,
      titulo: 'Transformers',
      telefone: '55-98686-7575',
      email: 'cyberdrom@gmail.com',
      id: 1
    },
    {
      grupos: enums.Grupos.FAMILY,
      titulo: 'Lampião',
      telefone: '01-92121-7171',
      email: 'cangaco@gmail.com',
      id: 2
    },
    {
      grupos: enums.Grupos.GUYS,
      titulo: 'Maria Bonita',
      telefone: '81-94848-1212',
      email: 'bela@gmail.com',
      id: 3
    },
    {
      grupos: enums.Grupos.WORK,
      titulo: 'Jonh Connor',
      telefone: '01-97474-7777',
      email: 'resistencia@gov.com',
      id: 4
    },
    {
      grupos: enums.Grupos.WORK,
      titulo: 'Terminator',
      telefone: '05-99999-9999',
      email: 't1000@gmail.com',
      id: 5
    },
    {
      grupos: enums.Grupos.WORK,
      titulo: 'Sara Connor',
      telefone: '55-98181-7777',
      email: 'resistencia2@gov.com',
      id: 6
    }
  ]
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (contato) => contato.id !== action.payload
      )
    },
    editar: (state, action: PayloadAction<Contatos>) => {
      const indexContato = state.itens.findIndex(
        (contato) => contato.id === action.payload.id
      )
      if (indexContato >= 0) {
        state.itens[indexContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contatos, 'id'>>) => {
      const contatoExiste = state.itens.find(
        (contato) =>
          contato.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )
      if (contatoExiste) {
        alert('Já Existe um contato com esse nome "ou" Descrição')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]
        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contactsSlice.actions
export default contactsSlice.reducer