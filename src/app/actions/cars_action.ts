export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getCar = async () => {
  try {
    const res = await axios.get(`${base_url}/cars`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const postCar = async (payload: FormData) => {
  try {
    const res = await axios.post(`${base_url}/cars`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const updateCar = async (id: string | undefined, payload: FormData) => {
  try {
    const res = await axios.put(`${base_url}/cars/${id}`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`${base_url}/cars/${id}`, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};
