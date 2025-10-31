import axios from "axios";


const API_URL = "http://localhost:3000/api/product";


export const getProductbyId = async (id)=>{
    try {
        const response = await axios.get(`${API_URL}/${id}`,{
            withCredentials:true
        });
    
        return response.data;
        
    } catch (error) {
        console.log(error);
        
    }
}


export const updateProduct = async(formData,id)=>
{
    try {
        console.log("api update product")
        const response = await axios.put(`${API_URL}/update/${id}`,formData,{
            withCredentials : true,
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;

        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}


export const addProduct = async(formData)=>{
    try {
        const response = await axios.post(`${API_URL}/add`,formData,{
            withCredentials:true,
            headers:{
                "Content-Type": "multipart/form-data",
            },
        })

        return response.data;
    } catch (error) {
        console.log(error);

    }
}


export const fetchProducts = async()=>{
    const response = await axios.get(`${API_URL}`,{
        withCredentials:true
    });
    return response.data;
}


export const fetchUserProduct = async()=>{
   try {
     const res = await axios.get(`${API_URL}/my`,{
        withCredentials:true
    });
    return res.data;
    
   } catch (error) {
    console.log(error);
    return null;
   }
}


export const deleteProductById = async(id)=>{
    try {

        const res = await axios.delete(`${API_URL}/${id}`,{
            withCredentials:true
        });

        return res.data;
        
    } catch (error) {
        console.log(error);
        
    }
}