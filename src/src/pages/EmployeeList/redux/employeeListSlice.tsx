/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IEmployee } from '../types/employeeListTypes';
import { fetchData, sendData } from '../../../../api/api';
import { notification } from 'antd';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
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
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Employee")
    }
});

export const postEmployee = createAsyncThunk('postEmployee', async (postData: any,{dispatch}) => {
        try {
            const response = await sendData('/Employees/AddEmployee', postData);
            if(response?.status === 200){
                notification.success({
                    message: 'Employee created successfully',
                    placement: 'topRight', 
                });
                dispatch(getEmployees());
                return response.data;
            }
            notification.error({
                message: 'Employee already exists',
                placement: 'topRight',
            });
        }
        catch (error) {
            notification.error({
                message: 'Employee already exists',
                placement: 'topRight',
            });
            console.log("Error in POST Employee")
        }
    }
);

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

        // POST Employee
        builder.addCase(postEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postEmployee.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(postEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });

    }
});

export default employeeListSlice.reducer; // to store
