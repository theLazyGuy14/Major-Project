import axios from 'axios'

const API_URL = '/api/users/'

// Generate policy
const policy = async (policyData) => {
    const headers = { 'Authorization' : 'Bearer '+policyData.user.token}
    const response = await axios.post(API_URL + 'policy', policyData, {headers})   

    return response.data
}

// Assign attributes
const addAttributes = async (userData) => {
    const headers = { 'Authorization' : 'Bearer '+userData.user.token}
    const response = await axios.post(API_URL +'attributes', userData, {headers})

    return response.data
}

// Check for decryption
const decrypt = async (userData) => {
    const headers = { 'Authorization' : 'Bearer '+userData.user.token}
    const response = await axios.get(API_URL +'decrypt', {headers})

    return response.data
}

const noteService = {
    policy,
    addAttributes,
    decrypt,
}

export default noteService