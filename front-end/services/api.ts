import axios from 'axios';

const API_URL = 'http://192.168.137.242:5000/api/auth'; // Replace with your backend URL

export const register = async (firstName: string, lastName: string, username: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    firstName,
    lastName,
    username,
    password,
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
 try {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return response.data;
 } catch (error) {
    console.log(error);
 }
  
};

// export const forgotPassword = async (username: string) => {
//   const response = await axios.post(`${API_URL}/forgot-password`, {
//     username,
//   });
//   return response.data;
// };

// services/api.ts
export const forgotPassword = async (username: string) => {
    const response = await axios.post(`${API_URL}/forgot-password`, {
      username,
    });
    return response.data;
};