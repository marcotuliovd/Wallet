import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER: return {
    ...state,
    ...action.payload,
  };
  default: return state;
  }
}

export default user;
