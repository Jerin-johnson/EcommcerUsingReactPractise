import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000/api/cart";


export const fetchCart = createAsyncThunk('cart/fetchCart',async(_,{rejectWithValue})=>{
    try {
        console.log("hai helloe")
        const response = await axios.get(`${API_URL}`,{withCredentials:true});
        return response.data.data;
        
    } catch (err) {
        console.log(err);
         return rejectWithValue(err.response?.data?.message || 'Failed to load cart');
    }
})


export const addToCart = createAsyncThunk(`cart/addToCart`,async (productId,{rejectWithValue})=>{
try {
    const response = await axios.post(`${API_URL}/add/${productId}`,{},{withCredentials:true});
    
    return response.data.data;
} catch (err) {
     console.log(err);
         return rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
}
});


export const removeFromCart = createAsyncThunk(`cart/removeFromCart`,async(productId,{rejectWithValue})=>{
    try {
         await axios.delete(`${API_URL}/${productId}`, { withCredentials: true });
          return productId;
        
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response?.data?.message || 'Failed to delete item from cart');
    }
});


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        loading:false,
        error:null,
    },
    reducers:{
        clearCart :(state)=>{
            state.items.length = 0;
        }
    },
    extraReducers:(builder)=>{
        builder.
        addCase(fetchCart.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.items = action.payload;
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.items = state.items.filter((item)=> item.productId._id !== action.payload)
        })
    }
});


export default cartSlice.reducer;
export const {clearCart} = cartSlice.actions;