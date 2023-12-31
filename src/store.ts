/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from 'redux-logger'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employeeListSlice from './src/pages/EmployeeList/redux/employeeListSlice';
import teamListSlice from './src/pages/TeamList/redux/teamListSlice';
import teamLeadListSlice from './src/pages/TeamLeadList/redux/teamLeadListSlice';
import evaluationListSlice from './src/pages/EvaluationList/redux/evaluationListSlice';
import employeeSlice from './src/pages/Employee/redux/employeeSlice';
import loginSlice from './src/pages/LoginPage/redux/loginSlice';


const rootReducer = combineReducers({
    login: loginSlice,
    employees: employeeListSlice,
    teams: teamListSlice,
    teamLeads: teamLeadListSlice,
    evaluations: evaluationListSlice,
    employee: employeeSlice
});

// FYI: Passing preloaded state for unit testing
const store: any = (preloadedState?: any) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(logger)
    });

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
