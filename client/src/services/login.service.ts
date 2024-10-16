import { Customers } from "../models/customers.model";
import api, {} from "./httpService"


class AuthService{

    private BASE_URL: string = "/login";

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
        return api.post(`${this.BASE_URL}/login`, data)
            .then(res => res.data)
            .catch(error => {
                console.error('Error during login:', error);
                throw error;
            });
    }
    
}


export default new AuthService()