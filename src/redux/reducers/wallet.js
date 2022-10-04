const INITIAL_STATE = {
  idToEdit: 0,
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'toCurrencies':
    return { ...state, currencies: action.payload };
  case 'addExpense':
    return { ...state, wallet: action.payload };
  default:
    return state;
  }
}

export default wallet;
