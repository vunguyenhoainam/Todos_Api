import axios from "axios";

const Api = axios.create({
  // baseURL: "https://602de21196eaad00176dce1f.mockapi.io/api/item",
  baseURL: "http://localhost:5000/item",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 60000
});

export const createData = (data) => Api.post("/", data);
export const putData = (id, data) => Api.put(`/${id}`, data);
export const deleteData = (id) => Api.delete(`/${id}`);
export const getData = () => Api.get("/");
