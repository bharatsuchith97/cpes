/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchData, updateData } from '../../../../api/api';
import { IEmployee, ITeam } from '../types/teamLeadListTypes';
import { notification } from 'antd';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
    teams: Array<ITeam>;
    teamLeads: Array<IEmployee>,
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

// export const getTeamLeads = createAsyncThunk('getTeamLeads', async () => {
//     try {
//         const response = await fetchData('/TeamLead'); // Replace with your API URL
//         return response;
//     }
//     catch (error: any) {
//         console.log("Error in GET Team Lead")
//     }
// });

export const getEmployees = createAsyncThunk('getEmployees', async () => {
    try {
        const response = await fetchData('/Employees'); // Replace with your API URL
        return response;
    }
    catch (error: any) {
        console.log("Error in GET Employees")
    }
});

export const postTeamLead = createAsyncThunk('postTeamLead', async (postData: any,{dispatch}) => {
    try {
        const updatedData = JSON.parse(JSON.stringify(postData));
        updatedData.isTeamLead = true;
        const response = await updateData(`/Employees/${postData?.id}`, updatedData);
        if(response.status === 200 || response.status === 201 || response.status === 204){
            notification.success({
                message: 'Team Lead created successfully',
                placement: 'topRight',
            });
        dispatch(getEmployees());
        return response.data;
        }
        notification.error({
            message: 'Team Lead could not be created',
            placement: 'topRight',
        });
    }
    catch (error:any) {
        notification.error({
            message: error?.response?.data?.title,
            placement: 'topRight',
        });
        console.log("Error in PUT Team Lead")
    }
}
);

export const deleteTeamLead = createAsyncThunk('deleteTeamLead', async (data: any,{dispatch}) => {
    try {
        const updatedData = JSON.parse(JSON.stringify(data));
        updatedData.isTeamLead = false;
        const response = await updateData(`/Employees/${data?.id}`, updatedData);
        console.log("KK",response)
        if(response.status === 200 || response.status === 201 || response.status===204){
            notification.success({
                message: 'Team Lead removed successfully',
                placement: 'topRight',
            });
        dispatch(getEmployees());
        return response.data;
        }
        notification.error({
            message: 'Team Lead could not be removed',
            placement: 'topRight',
        });
    }
    catch (error:any) {
        notification.error({
            message: error?.response?.data?.title,
            placement: 'topRight',
        });
        console.log("Error in PUT Team Lead")
    }
}
);

const teamLeadListSlice = createSlice({
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
        // builder.addCase(getTeamLeads.pending, (state) => {
        //     state.isLoading = true;
        // });
        // builder.addCase(getTeamLeads.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.teamLeads = action.payload ?? [];
        // });

        // builder.addCase(getTeamLeads.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.errorMessage = action.error.message;
        // });

        // GET ALL Employees
        builder.addCase(getEmployees.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employees = action.payload ?? [];
            state.teamLeads = action.payload?.filter((employee:any)=>employee.isTeamLead === true)
        });

        builder.addCase(getEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });

        // POST Team
        builder.addCase(postTeamLead.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postTeamLead.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(postTeamLead.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });

    }
});

export default teamLeadListSlice.reducer; // to store
