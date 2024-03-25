
import axios from './axios'

export const register = async (
    data) => {
        try { 
            const response = await axios.post('/regiser', JSON.string
            headers: {
                "Content-Type": "application/json"
            })
            return response;
        } catch (error) {
            return error;
        }
 
    }

    

