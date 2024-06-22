export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getOneModel = async (id: string | string[]) => {
  try {
    const res = await axios.get(`${base_url}/models/${id}`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};
export const getModels = async () => {
  try {
    const res = await axios.get(`${base_url}/models`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const postModels = async (payload: FormData) => {
  try {
    const res = await axios.post(`${base_url}/models`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const updateModels = async (id: string, payload: FormData) => {
  try {
    const res = await axios.put(`${base_url}/models/${id}`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const deleteModels = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`${base_url}/models/${id}`, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};
