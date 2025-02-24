import axios from "axios";

// Create axios client for API call
const radixLife = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default radixLife;