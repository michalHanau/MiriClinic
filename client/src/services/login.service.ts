import { Customers } from "../models/customers.model";
import api, {} from "./httpService"


class AuthService{

    BASE_URL: string = "https://miriclinic-server.onrender.com/api/login";

    registerUser(data: Customers) {
        return api.post(`${this.BASE_URL}/register`, data)
        .then(res => res.data)
        .catch(error => {
          console.error('Error fetching available appointments:', error);
          throw error;
        });
    }

    loginUser(data: any) {
        console.log("נכנסנו לפונקציית ההתחברות");
        console.log(process.env.REACT_APP_API_URL,this.BASE_URL);
        return api.post(`https://miriclinic-server.onrender.com/api/login/login`, data)
            .then(res => res.data)
            .catch(error => {
                console.error('Error during login:', error);
                throw error;
            });
    }
    
}


export default new AuthService()