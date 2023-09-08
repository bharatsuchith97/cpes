/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseUrl = 'https://cpesdeployment.azurewebsites.net/api'; // Replace with your API's base URL
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
      }
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

export const sendData = async (endpoint:string, data:any) => {
    try {
        const response = await api.post(endpoint, data );
        return response;
    } catch (error) {
        console.log(error, "error")
        throw error;
    }
}

export const updateData = async (endpoint:string, data:any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.put(endpoint, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (endpoint:string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.delete(endpoint);
        return response;
    } catch (error) {
        throw error;
    }
};