import axios from 'axios'

// Change in github too
export const api = axios.create({
    baseURL: 'http://192.168.0.8:3333',
})
