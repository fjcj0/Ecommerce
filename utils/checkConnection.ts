import axios from 'axios';
export const checkConnection = async () => {
    try {
        await axios.get('http://localhost:3000/api/test');
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
};