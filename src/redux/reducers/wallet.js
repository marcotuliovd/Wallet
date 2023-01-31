import { DELETE_ITEM, REQUEST_CURRENCY, SAVE_CURRENCY,
  SAVE_EXCHANGERATES, SAVE_EXPENSE, ESCONDE_ADICIONAR,
  MOSTRA_ADICIONAR } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  loading: false,
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  exchangeRates: {},
  adicionar: true,
};

function Wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY: return {
    ...state,
    loading: true,
  };
  case SAVE_CURRENCY: return {
    ...state,
    currencies: action.payload,
    loading: false,
  };
  case SAVE_EXCHANGERATES: return {
    ...state,
    exchangeRates: action.payload,
    loading: false,
  };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
        },
      ],
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: action.payload,
    };
  case ESCONDE_ADICIONAR:
    return {
      ...state,
      adicionar: false,
    };
  case MOSTRA_ADICIONAR:
    return {
      ...state,
      adicionar: true,
    };
  default: return state;
  }
}

export default Wallet;
