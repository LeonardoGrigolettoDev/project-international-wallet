const INITIAL_STATE = {
  currencies: [],
  expensies: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'addExpense':
    return { ...state, wallet: action.wallet };
  default:
    return state;
  }
}

export default wallet;
