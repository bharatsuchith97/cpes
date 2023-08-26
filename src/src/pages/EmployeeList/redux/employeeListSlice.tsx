/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IEmployee } from '../types/employeeListTypes';
import { fetchData, loginData } from '../../../../api/api';
import jwtDecode from 'jwt-decode';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string|undefined;
    employees: Array<IEmployee>;
}

interface Response {
    refreshToken : string,
    token : string,
    userId : string,
    data : object
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

export const loginEmployees = createAsyncThunk('loginEmployees', async (data : object) => {
    console.log(data, "data")
    try{
        const response : Response = await loginData('/Account/Login', data); 
        const user = jwtDecode(response?.token);
        localStorage.setItem("authDetails" , JSON.stringify(user));
    }
    catch(error : any){
        console.log("Error in POST Employee")
    }
} )

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
