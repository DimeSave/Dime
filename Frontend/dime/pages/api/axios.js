import axios from "axios"

const BASE_URL = "http:/localhost:5010  "

export default axios.create({
    baseURL: BASE_URL
})