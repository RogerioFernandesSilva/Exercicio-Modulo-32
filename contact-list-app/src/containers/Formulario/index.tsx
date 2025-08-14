import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AreaTag, BacktoPage, BtnCadastro, Dados, Fild, Opcao } from './styles'
import * as enums from '../../utils/enums/contatos'
import { cadastrar } from '../../store/reducers/contacts'
import { Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [grupos, setGrupos] = useState(enums.Grupos.GUYS)
  const [titulo, setTitulo] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState<string[]>([])

  const validarFormulario = () => {
    const errosTemp: string[] = []

    if (!titulo.trim()) errosTemp.push('O nome é obrigatório.')
    if (!telefone.trim()) errosTemp.push('O telefone é obrigatório.')
    if (!email.trim()) {
      errosTemp.push('O e-mail é obrigatório.')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errosTemp.push('O e-mail não é válido.')
    }

    // Validação simples de telefone (opcional)
    if (telefone && !/^\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone)) {
      errosTemp.push('O telefone deve estar no formato (99) 99999-9999.')
    }

    setErros(errosTemp)
    return errosTemp.length === 0
  }

  const cadastrarContato = (evento: FormEvent) => {
    evento.preventDefault()

    if (!validarFormulario()) return

    dispatch(
      cadastrar({
        grupos,
        titulo,
        telefone,
        email
      })
    )
    navigate('/')
  }

  return (
    <div>
      <h2>Novo Contato</h2>

      {erros.length > 0 && (
        <ul style={{ color: 'red', marginBottom: '1rem' }}>
          {erros.map((erro, index) => (
            <li key={index}>{erro}</li>
          ))}
        </ul>
      )}

      <form onSubmit={cadastrarContato}>
        <Fild>
          <legend>Dados de Cadastro</legend>
          <Dados
            value={titulo}
            onChange={({ target }) => setTitulo(target.value)}
            type="text"
            placeholder="Descrição ou Nome"
          />
          <Dados
            value={telefone}
            onChange={({ target }) => setTelefone(target.value)}
            type="text"
            placeholder="(99) 99999-9999"
          />
          <Dados
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            placeholder="Digite o e-mail"
          />
        </Fild>

        <AreaTag>
          {Object.values(enums.Grupos).map((grupo) => (
            <Opcao key={grupo}>
              <input
                value={grupo}
                name="prioridade"
                type="radio"
                onChange={(evento) =>
                  setGrupos(evento.target.value as enums.Grupos)
                }
                id={grupo}
                defaultChecked={grupo === enums.Grupos.GUYS}
              />
              <label htmlFor={grupo}>{grupo}</label>
            </Opcao>
          ))}
        </AreaTag>

        <div style={{ display: 'flex' }}>
          <BtnCadastro type="submit">
            <IoAdd style={{ fontSize: '1rem', marginLeft: '.5rem' }} />
            Cadastrar
          </BtnCadastro>
          <div>
            <Link to="/">
              <BacktoPage
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginLeft: '1rem'
                }}
              >
                <MdArrowBack
                  style={{ fontSize: '1rem', marginLeft: '.5rem' }}
                />
                Voltar para Contatos
              </BacktoPage>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Formulario