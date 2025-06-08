import { RegisterFormValues } from "@/lib/validations/authValidations";
import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "http://localhost:5000/api",
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

export const authApi = {
   register: async (data: RegisterFormValues) => {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
   },
   getUser: async () => {
      const response = await axiosInstance.get("/auth/user");
      return response.data;
   },
};
