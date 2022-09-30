const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'addEmail':
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
