import axios from 'axios';

export const shopifyApi = axios.create({
    baseURL: 'https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js'
});