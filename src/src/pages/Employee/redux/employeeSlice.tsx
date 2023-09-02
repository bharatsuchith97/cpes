/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../../../api/api';
import { IEmployee } from '../../EmployeeList/types/employeeListTypes';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
    employee: IEmployee;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    employee: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    teamId: 0,
    isTeamLead: false,
    isAdmin: false,
    teamLeadId: '',
    evaluations:[]
    },
};

export const getEmployee = createAsyncThunk('getEmployee', async (data:any) => {
    try {
        const response = await fetchData(`/Employees/${data}`); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Employee")
    }
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // GET ALL Employees
        builder.addCase(getEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employee = action.payload ?? [];
        });

        builder.addCase(getEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });
    }

});

export default employeeSlice.reducer; // to store
