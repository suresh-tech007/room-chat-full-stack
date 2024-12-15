import axios from "axios";

export const baseURL = "https://group-chat-mk3x.onrender.com" ;
// export const baseURL = "http://localhost:8080" ;
export const httpClient = axios.create({
    baseURL:baseURL
})