/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from 'redux-logger'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employeeListSlice from './src/pages/EmployeeList/redux/employeeListSlice';
import teamListSlice from './src/pages/TeamList/redux/teamListSlice';
import teamLeadListSlice from './src/pages/TeamLeadList/redux/teamLeadListSlice';


const rootReducer = combineReducers({
    employees: employeeListSlice,
    teams: teamListSlice,
    teamLeads: teamLeadListSlice
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
