/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IEmployee } from '../types/employeeListTypes';
import { deleteData, fetchData, sendData } from '../../../../api/api';
import { notification } from 'antd';
import { ITeam } from '../../TeamList/types/teamListTypes';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
    employees: Array<IEmployee>;
    teams: Array<ITeam>;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    employees: [],
    teams:[]
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
        catch (error:any) {
            notification.error({
                message: error?.response?.data?.title,
                placement: 'topRight',
            });
            console.log("Error in POST Employee")
        }
    }
);

export const deleteEmployee = createAsyncThunk('deleteEmployee', async (data: any,{dispatch}) => {
    try {
        const response = await deleteData(`/Employees/${data}`);
        if(response?.status === 200 || response?.status === 204){
            notification.success({
                message: 'Employee deleted successfully',
                placement: 'topRight', 
            });
            dispatch(getEmployees());
            return response.data;
        }
        notification.error({
            message: 'Employee can not be deleted',
            placement: 'topRight',
        });
    }
    catch (error:any) {
        notification.error({
            message: error?.response?.data?.title,
            placement: 'topRight',
        });
        console.log("Error in DELETE Employee")
    }
}
);

export const getTeams = createAsyncThunk('getTeams', async () => {
    try {
        const response = await fetchData('/Team'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Team")
    }
});

export const postEvaluation = createAsyncThunk('postEvaluation', async (postData: any,{dispatch}) => {
    try {
        const response = await sendData('/Evaluation', postData);
        if(response?.status === 200){
            notification.success({
                message: 'Evaluation done',
                placement: 'topRight', 
            });
            dispatch(getEmployees());
            return response.data;
        }
        notification.error({
            message: 'Evaluation failed',
            placement: 'topRight',
        });
    }
    catch (error:any) {
        notification.error({
            message: error?.response?.data?.title,
            placement: 'topRight',
        });
        console.log("Error in POST Evaluations")
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
     // GET ALL Teams
     builder.addCase(getTeams.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload ?? [];
    });

    builder.addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
    });
    }
});

export default employeeListSlice.reducer; // to store
