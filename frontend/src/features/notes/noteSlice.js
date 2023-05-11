import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from '../notes/noteService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user : user ? user : null,
    isError : false,
    isSuccess : false,
    isLoading: false,
    message : ''
}

// Generate access policy
export const policy = createAsyncThunk('note/policy', async (policyData, thunkAPI) => {
    try {
        return await noteService.policy(policyData)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// Assign attributes
export const addAttributes = createAsyncThunk('note/attributes', async (userData, thunkAPI) => {
    try {
        return await noteService.addAttributes(userData)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// Check for decryption
export const decrypt = createAsyncThunk('note/decrypt', async (userData, thunkAPI) => {
    try {
        console.log(userData)
        return await noteService.decrypt(userData)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const noteSlice = createSlice({
    name : 'note',
    initialState,
    reducers : {
        reset : (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(policy.pending, (state) => {
                state.isLoading = true                
            })
            .addCase(policy.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(policy.rejected, (state, action) => {                
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(addAttributes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addAttributes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true   
                state.message = action.payload             
            })
            .addCase(addAttributes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(decrypt.pending, (state) => {
                state.isLoading = true
            })
            .addCase(decrypt.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(decrypt.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer