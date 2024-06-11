const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios"
export const getCategories = async() => {
    try {
        const res = await axios.get(`${base_url}/categories`)
        return res
    } catch (error) {
        console.log(error);
        
    }
}