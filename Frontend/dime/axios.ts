import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5010"
});

export const registerUser = async (data:{firstName: string, lastName: string, email: string, password: string}) => {
    try {
        const response = await api.post("/users/registeruser", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}