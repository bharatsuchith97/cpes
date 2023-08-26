/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../../../api/api';
import { ITeam } from '../types/teamListTypes';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string|undefined;
    teams: Array<ITeam>;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    teams: []
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
       
    }
});

export default teamListSlice.reducer; // to store
