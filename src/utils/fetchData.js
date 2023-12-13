import { API_KEY } from "../config/api";

export const fetchData = async () => {
  const response = await fetch(`${API_KEY}/api/v1/sector/`);
  const data = await response.json();
  return data;
};
