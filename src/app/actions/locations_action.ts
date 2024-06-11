export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getLocation = async () => {
  try {
    const res = await axios.get(`${base_url}/locations`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const postLocation = async (payload: FormData) => {
  try {
    const res = await axios.post(`${base_url}/locations`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const updateLocation = async (id: string, payload: FormData) => {
  try {
    const res = await axios.put(`${base_url}/locations/${id}`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocation = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`${base_url}/locations/${id}`, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};
