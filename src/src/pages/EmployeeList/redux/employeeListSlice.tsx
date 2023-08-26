/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IEmployee } from '../types/employeeListTypes';
import { fetchData } from '../../../../api/api';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string|undefined;
    employees: Array<IEmployee>;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    employees: []
};

export const getEmployees = createAsyncThunk('getEmployees', async () => {
    try {
        const response = await fetchData('/Employees'); // Replace with your API URL
        return response.data;
    }
    catch (error: any) {
        console.log("Error in GET Employee")
    }
});


const employeeListSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // GET ALL Employees
        builder.addCase(getEmployees.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employees = action.payload ?? [];
        });

        builder.addCase(getEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;        
        });
       
    }
});

export default employeeListSlice.reducer; // to store
