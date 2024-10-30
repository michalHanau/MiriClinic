export class Customers{
    // customer_id?: number = 0 
    first_name!: string
    last_name!: string
    phone!: string
    email:string
    // password!: string
    // confirmPassword!: string
    birthdate?: Date



constructor( first_name:string, last_name:string, phone:string, email:string, birthdate?:Date){
    this.first_name=first_name
    this.last_name=last_name
    this.phone=phone
    this.email=email
    // this.password=password
    // this.confirmPassword=confirmPassword
    this.birthdate=birthdate

}
}
