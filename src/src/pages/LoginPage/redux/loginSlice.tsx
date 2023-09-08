/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendData } from '../../../../api/api';
import jwtDecode from 'jwt-decode';
import { notification } from 'antd';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
    isAuthenticated: boolean;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
    isAuthenticated: false
};

export const loginEmployees = createAsyncThunk('loginEmployees', async (data: any) => {
    try {
        const loginData = { email: data.username, password: data.password }
        const response: any = await sendData('/Account/Login', loginData);
        console.log("response", response)
        if (response?.status === 200) {
            notification.success({
                message: 'Login successful',
                placement: 'topRight', 
            });
            const user = jwtDecode(response?.data?.token);
            localStorage.setItem("authDetails", JSON.stringify(user));
            localStorage.setItem("token", response?.data?.token);
            return (response.data)
        }
        notification.error({
            message: 'Invalid credentials',
            placement: 'topRight',
        });
        return null
    }
    catch (error: any) {
        notification.error({
            message: 'Invalid credentials',
            placement: 'topRight',
        });

        console.log("Error in POST Employee")
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginEmployees.pending, (state) => {
            state.isLoading = true;
            state.isAuthenticated = false;

        });
        builder.addCase(loginEmployees.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isAuthenticated = action?.payload ? true : false;
        });

        builder.addCase(loginEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
            state.isAuthenticated = false;

        });

    }
});

export default loginSlice.reducer; // to store
