/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../../../api/api';
import { ITeam } from '../../TeamList/types/teamListTypes';
import { IEmployee, IEvaluation } from '../../EmployeeList/types/employeeListTypes';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
    employees: Array<IEmployee>;
    teams: Array<ITeam>;
    evaluations: Array<IEvaluation>;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    employees: [],
    teams: [],
    evaluations: []
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
export const getEvaluations = createAsyncThunk('getEvaluations', async () => {
    try {
        const response = await fetchData('/Evaluation'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Evaluation")
    }
});
export const getTeams = createAsyncThunk('getTeams', async () => {
    try {
        const response = await fetchData('/Team'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Team")
    }
});


const evaluationListSlice = createSlice({
    name: 'evaluations',
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
        // GET ALL Evaluations
        builder.addCase(getEvaluations.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEvaluations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.evaluations = action.payload ?? [];
        });

        builder.addCase(getEvaluations.rejected, (state, action) => {
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

export default evaluationListSlice.reducer; // to store
