/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseUrl = 'https://cpesservicewebapi.azurewebsites.net/api'; // Replace with your API's base URL

const api = axios.create({
    baseURL: baseUrl,
});

export const fetchData = async (endpoint:string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postData = async (endpoint:string, data:any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const putData = async (endpoint:string, data:any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (endpoint:string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.delete(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
};