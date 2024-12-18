import api from "./httpService"


class TreatmentService{

    BASE_URL: string = "/treatments";

    getTreatmentName(){
        console.log("פונקצית GET")
        return api.get(`${this.BASE_URL}/name`)
        .then((res) => {
            return res.data;
          })
          .catch((error) => {
            console.error("Error fetching treatment name:", error);
            throw error;
          });
    }

}


export default new TreatmentService()