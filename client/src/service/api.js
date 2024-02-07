import axios from 'axios';

import {  getHeadersAndParams } from '../utils/common-utils';

export const getData = async (formData, jsonText, paramData, headerData) => {
    
    const apiType = formData.type.toLowerCase(); 
    const apiUrl = formData.url.split('?')[0];
    const apiHeaders = getHeadersAndParams(headerData);
    const apiParams = getHeadersAndParams(paramData);
    console.log(jsonText)

    try {
        return await axios({
            method: apiType,
            url: apiUrl,
            data: jsonText,
            headers: {
                'Content-Type': 'application/json',
            },
            params: apiParams
        })
    } catch (error) {
        console.log('Error while getting the response ', error);
        return {type:'error', error: error?.response?.data};
    }
}