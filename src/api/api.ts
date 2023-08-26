/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseUrl = 'https://cpesservicewebapi.azurewebsites.net/api'; // Replace with your API's base URL

const api = axios.create({
    baseURL: baseUrl,
});
interface Response {
    refreshToken : string,
    token : string,
    userId : string,
    data : object
}

export const fetchData = async (endpoint:string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginData = async (endpoint:string, payload:any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        console.log(payload, "payload")
        const response : Response = await api.post(endpoint, {email : payload.username , password : payload.password} );
        console.log(response, "response")
        return response.data;
    } catch (error) {
        console.log(error, "error")
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