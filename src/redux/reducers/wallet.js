const INITIAL_STATE = {
  idToEdit: 0,
  currencies: [],
  expenses: [],
  totalValue: 0,
  // api: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'toCurrencies':
    return { ...state, currencies: action.payload };
  // case 'api':
  //   return { ...state, api: action.payload };
  case 'expenses':
    console.log(action.payload);
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'totalValue':
    return { ...state, totalValue: action.payload };
  case 'addExpense':
    return { ...state, wallet: action.payload };
  default:
    return state;
  }
}

export default wallet;
