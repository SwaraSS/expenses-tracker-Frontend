import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlices";
import expensesReduser from "../slices/expenses/expensesSlices";
import incomeSlices from "../slices/income/incomeSlices";
 

const store = configureStore({
    reducer: {
        users: userReducer,
        expenses: expensesReduser,
        income: incomeSlices,
    },
});

export default store;