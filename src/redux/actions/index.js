// user
export const addEmailAction = (payload) => ({ type: 'addEmail', payload });
// wallet
export const addExpenseAction = (payload) => ({ type: 'addExpense', payload });
export const expensesAction = (payload) => ({ type: 'expenses', payload });
const toCurrencies = (payload) => ({ type: 'toCurrencies', payload });
export const totalValue = (payload) => ({ type: 'totalValue', payload });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      delete (data.USDT);
      const currencies = Object.keys(data);
      dispatch(toCurrencies(currencies));
      // dispatch(requestAPIAction(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function totalValueAndExpenses(dispatchInfos) {
  return async (dispatch) => {
    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await api.json();
    delete (data.USDT);
    dispatchInfos.exchangeRates = data;
    dispatch(expensesAction(dispatchInfos));
  };
}
