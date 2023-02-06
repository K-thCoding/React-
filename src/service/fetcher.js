import axios from "axios";

const url = "/data/product.json";

export const getProducts = () => {
    const res = axios(url);
    return res;
};