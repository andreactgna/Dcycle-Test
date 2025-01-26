import axios from "axios";

const API_URL = "http://localhost:3200/api";

export const fetchData = async <T>(endpoint: string, name: string): Promise<any> => {
  try {
    const response = await axios.get<T>(`${API_URL}/${endpoint}/${name}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos");
  }
};


export const fetchDataCovid = async <T>(endpoint: string): Promise<any> => {
  try {
    const response = await axios.get<T>(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos");
  }
};
