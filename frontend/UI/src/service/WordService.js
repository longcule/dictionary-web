// services/countriesService.js
import axios from 'axios';

const getWord = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
}

export default getWord;
