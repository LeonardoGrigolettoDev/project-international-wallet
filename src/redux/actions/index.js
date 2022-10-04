// user
export const addEmailAction = (payload) => ({ type: 'addEmail', payload });
// wallet
export const addExpenseAction = (payload) => ({ type: 'addExpense', payload });
const requestAPIAction = (payload) => ({ type: 'toCurrencies', payload });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      delete (data.USDT);
      const currencies = Object.keys(data);
      dispatch(requestAPIAction(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}
