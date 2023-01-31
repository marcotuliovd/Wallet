export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const SAVE_CURRENCY = 'SAVE_CURRENCY';
export const FAILED_CURRENCY = 'FAILED_CURRENCY';
export const REQUEST_EXCHANGERATES = 'REQUEST_EXCHANGERATES';
export const SAVE_EXCHANGERATES = 'SAVE_EXCHANGERATES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const ESCONDE_ADICIONAR = 'ESCONDE_ADICIONAR';
export const MOSTRA_ADICIONAR = 'MOSTRA_ADICIONAR';

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export function addWallet(payload) {
  return {
    type: ADD_WALLET,
    payload,
  };
}

function requestCurrency() {
  return {
    type: REQUEST_CURRENCY,
  };
}

function requestExchangeRates() {
  return {
    type: REQUEST_EXCHANGERATES,
  };
}

export function saveExpense(expenses) {
  return {
    type: SAVE_EXPENSE,
    payload: expenses,
  };
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    payload: item,
  };
}

export function editItem(item) {
  return {
    type: EDIT_ITEM,
    payload: item,
  };
}

export function escondeAdicionar(element) {
  return {
    type: ESCONDE_ADICIONAR,
    payload: element,
  };
}

export function mostraAdicionar(element) {
  return {
    type: MOSTRA_ADICIONAR,
    payload: element,
  };
}

function saveExchangeRates(exchangeRates) {
  return {
    type: SAVE_EXCHANGERATES,
    payload: exchangeRates,
  };
}

const saveCurrency = (currency) => ({
  type: SAVE_CURRENCY,
  payload: currency,
});

const failedCurrency = (error) => ({
  type: FAILED_CURRENCY,
  payload: error,
});

export const fecthCurrencyAction = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    delete data.USDT;
    dispatch(saveCurrency(Object.keys(data)));
  } catch (erro) {
    dispatch(failedCurrency(error.message));
  }
};

export const fecthExchangeRates = () => async (dispatch) => {
  dispatch(requestExchangeRates());
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(saveExchangeRates((data)));
  } catch (erro) {
    dispatch(failedCurrency(error.message));
  }
};
