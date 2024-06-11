export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getCities = async () => {
  try {
    const res = await axios.get(`${base_url}/cities`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postCity = async (payload: FormData) => {
  try {
    const res = await axios.post(`${base_url}/cities`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const updateCity = async (id: string, payload: FormData) => {
  try {
    const res = await axios.put(`${base_url}/cities/${id}`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const deleteCity = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`${base_url}/cities/${id}`, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};
