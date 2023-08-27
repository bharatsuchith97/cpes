/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendData } from '../../../../api/api';
import jwtDecode from 'jwt-decode';
import { notification } from 'antd';

interface InitialStateType {
    isLoading: boolean;
    errorMessage: string | undefined;
}

const initialState: InitialStateType = {
    isLoading: false,
    errorMessage: '',
};

export const loginEmployees = createAsyncThunk('loginEmployees', async (data: any) => {
    console.log(data, "data")
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
            window.location.reload();
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
        // GET ALL Employees
        builder.addCase(loginEmployees.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginEmployees.fulfilled, (state) => {
            state.isLoading = false;
        });

        builder.addCase(loginEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });

    }
});

export default loginSlice.reducer; // to store
