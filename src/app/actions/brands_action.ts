export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getBrand = async () => {
  try {
    const res = await axios.get(`${base_url}/brands`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const postBrand = async (payload: FormData) => {
  try {
    const res = await axios.post(`${base_url}/brands`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const updateBrand = async (id: string, payload: FormData) => {
  try {
    const res = await axios.put(`${base_url}/brands/${id}`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const deleteBrand = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`${base_url}/brands/${id}`, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};
