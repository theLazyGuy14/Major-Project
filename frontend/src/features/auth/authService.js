// Service is strictly for making HTTP request, and sending data back,
// and also to store any data to local storage

import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    
    // When using axios, it puts the response data in an object called data
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register
}

export default authService