import axios from 'axios';
const baseUrl = `https://api.giphy.com/v1/gifs/`;
const API_Key = `tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ`;

export const getTrendings = async() => {
    try {
        const route = `${baseUrl}trending`
        return await axios.get(route, { params: { api_key : API_Key } });
    } catch(error) {
        return null;
    }
};

export const searchGif = async(searchData: any) => {
    try {
        const route = `${baseUrl}/search`
        return await axios.get(route, {
            params: {
                api_key: API_Key,
                ...searchData
            }
        });
    } catch(error) {
        return null;
    }
};