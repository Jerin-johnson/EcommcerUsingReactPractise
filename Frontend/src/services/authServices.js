import axios from "axios";


const API_URL = "http://localhost:3000/api/user";


export const registerUser = async (formData)=>{
    const response  = await axios.post(`${API_URL}/signup`,formData,{
        withCredentials:true
    });

    return response.data;

}


export const loginUser = async (formData) => {
  const res = await axios.post(`${API_URL}/login`, formData, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async()=>{
  const res = await axios.get(`${API_URL}/logout`,{
    withCredentials:true
  });

  return res.data;
}