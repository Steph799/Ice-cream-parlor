import axios from 'axios';
import * as url from './url';

const baseUrl = url.generalInfo

export const getInfo = async (endpoint) => {
    const options = {
        method: 'get',
        url: `${baseUrl}${endpoint}`
    };
    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
       console.log(error);
    }
};


export const addInfo = async (endpoint, body) => {
    const options = {
        method: 'post',
        url: `${baseUrl}${endpoint}`,
        data: body
    };
    try {
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.log(error);
    }
}
export const updateInfo = async (endpoint, body, id) => {
    const options = {
        method: 'put',
        url: `${baseUrl}${endpoint}/${id}`,
        data: body
    };
    try {
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const removeInfo = async (endpoint, id) => {
    const options = {
        method: 'delete',
        url: `${baseUrl}${endpoint}/${id}`
    };
    try {
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.log(error);
    }
}