/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, sendData } from '../../../../api/api';

import { IEmployee, ITeam, ITeamLead } from '../types/teamListTypes';
import { useAppDispatch } from '../../../../hooks';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
    teams: Array<ITeam>;
    teamLeads: Array<ITeamLead>,
    employees: Array<IEmployee>
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    teams: [],
    teamLeads: [],
    employees: []
};

export const getTeams = createAsyncThunk('getTeams', async () => {
    try {
        const response = await fetchData('/Team'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Team")
    }
});

export const getTeamLeads = createAsyncThunk('getTeamLeads', async () => {
    try {
        const response = await fetchData('/TeamLead'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Team Lead")
    }
});

export const getEmployees = createAsyncThunk('getEmployees', async () => {
    try {
        const response = await fetchData('/Employees'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Employees")
    }
});

export const postTeam = createAsyncThunk('postTeam', async (postData) => {
    const dispatch = useAppDispatch();
    try {
        const response = await sendData('/Team', postData);
        dispatch(getTeams);
        return response;
    }
    catch (error) {
        console.log("Error in POST Team")
    }
});

const teamListSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
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

        // GET ALL Team Leads
        builder.addCase(getTeamLeads.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTeamLeads.fulfilled, (state, action) => {
            state.isLoading = false;
            state.teamLeads = action.payload ?? [];
        });

        builder.addCase(getTeamLeads.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });

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

        // POST Team
        builder.addCase(postTeam.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postTeam.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(postTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });

    }
});

export default teamListSlice.reducer; // to store
